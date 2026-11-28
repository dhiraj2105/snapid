const root = document.documentElement;
const themeButton = document.querySelector(".theme-toggle");
const menuButton = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector("#mobile-nav");
const toast = document.querySelector(".toast");
let toastTimeout;

function setTheme(theme) {
  root.dataset.theme = theme;
  themeButton.setAttribute(
    "aria-label",
    theme === "dark" ? "Switch to light theme" : "Switch to dark theme",
  );
  document.querySelector('meta[name="theme-color"]').content =
    theme === "dark" ? "#111715" : "#f6f7f8";
}

themeButton.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  setTheme(nextTheme);
  try {
    localStorage.setItem("snapid-theme", nextTheme);
  } catch {
    // Theme still changes for this page view when storage is unavailable.
  }
});

menuButton.addEventListener("click", () => {
  const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isExpanded));
  menuButton.setAttribute(
    "aria-label",
    isExpanded ? "Open navigation menu" : "Close navigation menu",
  );
  mobileNav.hidden = isExpanded;
});

mobileNav.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");
    mobileNav.hidden = true;
  }
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("visible"), 1800);
}

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copy);
      button.classList.add("copied");
      showToast("Copied to clipboard");
      setTimeout(() => button.classList.remove("copied"), 1000);
    } catch {
      showToast("Clipboard access isn't available in this browser");
    }
  });
});

document.querySelector("#year").textContent = String(new Date().getFullYear());
setTheme(root.dataset.theme || "light");

const npmDownloadCount = document.querySelector("#npm-download-count");
const npmDownloadsPeriod = document.querySelector(".downloads-period");
const npmDownloadsUrl =
  "https://api.npmjs.org/downloads/point/last-month/snapid";

async function loadNpmDownloads() {
  npmDownloadCount.textContent = "Loading…";
  npmDownloadsPeriod.textContent = "last 30 days";

  try {
    const response = await fetch(npmDownloadsUrl, {
      headers: { Accept: "application/json" },
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) {
      throw new Error(`npm downloads request failed with status ${response.status}`);
    }

    const data = await response.json();
    if (
      typeof data.downloads !== "number" ||
      !Number.isFinite(data.downloads) ||
      data.downloads < 0
    ) {
      throw new Error("npm downloads response did not contain a valid count");
    }

    npmDownloadCount.textContent = new Intl.NumberFormat().format(data.downloads);
    npmDownloadCount.setAttribute(
      "aria-label",
      `${new Intl.NumberFormat().format(data.downloads)} downloads in the last 30 days`,
    );
    npmDownloadCount.closest(".downloads-card").setAttribute("aria-busy", "false");
    if (typeof data.start === "string" && typeof data.end === "string") {
      npmDownloadsPeriod.title = `${data.start} through ${data.end}`;
    }
  } catch (error) {
    console.error("Unable to load Snapid npm download statistics:", error);
    npmDownloadCount.closest(".downloads-card").setAttribute("aria-busy", "false");
    npmDownloadCount.textContent = "Unavailable";
    npmDownloadCount.setAttribute(
      "aria-label",
      "npm download statistics are currently unavailable",
    );
    npmDownloadsPeriod.textContent = "try the npm stats link";
  }
}

loadNpmDownloads();
