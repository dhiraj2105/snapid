// import { describe, it, expect } from "vitest";
// import { snapid } from "../src/snapid";

// describe("snapid", () => {
//   it("generates a string", () => {
//     const id = snapid();
//     expect(typeof id).toBe("string");
//   });

//   it("respects custom size", () => {
//     const id = snapid({ size: 16 });
//     expect(id.length).toBeGreaterThanOrEqual(16);
//   });
// });

import { afterEach, describe, expect, it, vi } from "vitest";
import snapid, { SnapId } from "../src/snapid";
import { ALPHABETS } from "../src/constants";

afterEach(() => vi.useRealTimers());

describe("snapid basic behavior", () => {
  it("generates a default Base58 ID with 10 characters", () => {
    const id = snapid();
    expect(id).toHaveLength(10);
    expect(id).toMatch(/^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$/);
  });

  it("supports every exported alphabet", () => {
    for (const [name, alphabet] of Object.entries(ALPHABETS)) {
      const id = snapid({ alphabet: name as keyof typeof ALPHABETS, size: 24 });
      expect(id).toHaveLength(24);
      expect([...id].every((char) => alphabet.includes(char))).toBe(true);
    }
  });

  it("returns the exact configured size", () => {
    expect(snapid({ size: 1 })).toHaveLength(1);
    expect(snapid({ size: 16 })).toHaveLength(16);
  });

  it("provides named, default, and legacy exports", () => {
    expect(SnapId()).toBeTypeOf("string");
  });
});

describe("timestamp prefixes", () => {
  it("prepends fixed-width sortable prefixes", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-01T00:00:00.000Z"));
    const earlier = snapid({ time: true, seed: "a", size: 4 });

    vi.setSystemTime(new Date("2026-01-01T00:00:01.000Z"));
    const later = snapid({ time: true, seed: "a", size: 4 });

    expect(earlier).toHaveLength(11);
    expect(later).toHaveLength(11);
    expect(earlier < later).toBe(true);
  });

  it("uses fixed-width timestamp prefixes for hex", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-01T00:00:00.000Z"));
    expect(snapid({ time: true, alphabet: "hex", size: 4 })).toHaveLength(17);
  });
});

describe("seeded IDs", () => {
  it("is reproducible for the same seed", () => {
    expect(snapid({ seed: "user-123", size: 32 })).toBe(
      snapid({ seed: "user-123", size: 32 }),
    );
  });

  it("differs across seeds", () => {
    expect(snapid({ seed: "user-123" })).not.toBe(snapid({ seed: "user-456" }));
  });
});

describe("validation", () => {
  it("rejects invalid sizes", () => {
    expect(() => snapid({ size: 0 })).toThrow(RangeError);
    expect(() => snapid({ size: 1025 })).toThrow(RangeError);
    expect(() => snapid({ size: 2.5 })).toThrow(RangeError);
  });

  it("rejects invalid types", () => {
    expect(() => snapid({ time: "yes" as unknown as boolean })).toThrow(TypeError);
    expect(() => snapid({ alphabet: "base64" as never })).toThrow(TypeError);
    expect(() => snapid({ seed: 123 as unknown as string })).toThrow(TypeError);
  });
});

describe("uniqueness", () => {
  it("generates 10000 distinct IDs", () => {
    const ids = new Set<string>();
    for (let i = 0; i < 10_000; i++) ids.add(snapid());
    expect(ids.size).toBe(10_000);
  });
});
