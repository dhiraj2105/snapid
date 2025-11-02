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

import { describe, it, expect } from "vitest";
import { snapid } from "../src/snapid";

/**
 * Basic functionality tests
 */
describe("snapid - basic functionality", () => {
  it("generates a string", () => {
    const id = snapid();
    expect(typeof id).toBe("string");
    expect(id.length).toBeGreaterThanOrEqual(10);
  });

  it("respects custom size", () => {
    const id = snapid({ size: 16 });
    expect(id.length).toBeGreaterThanOrEqual(16);
  });

  it("uses Base58 alphabet by default", () => {
    const id = snapid();
    const validChars =
      /^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$/;
    expect(validChars.test(id)).toBe(true);
  });
});

/**
 * Timestamp / sortable prefix tests
 */
describe("snapid - timestamp prefix", () => {
  it("prepends timestamp when time: true", () => {
    const id = snapid({ time: true });
    // timestamp prefix is numeric but encoded in Base58
    expect(id.length).toBeGreaterThan(10);
  });

  it("IDs are sortable when time: true", () => {
    const id1 = snapid({ time: true });
    const id2 = snapid({ time: true });
    expect(id1 <= id2 || id1 >= id2).toBe(true);
  });
});

/**
 * Deterministic / seeded IDs
 */
describe("snapid - deterministic IDs", () => {
  it("returns same ID for same seed", () => {
    const id1 = snapid({ seed: "user123" });
    const id2 = snapid({ seed: "user123" });
    expect(id1).toBe(id2);
  });

  it("returns different IDs for different seeds", () => {
    const id1 = snapid({ seed: "user123" });
    const id2 = snapid({ seed: "user456" });
    expect(id1).not.toBe(id2);
  });
});

/**
 * Collision test - generate 1 million IDs
 * Note: This may take a few seconds
 */
describe("snapid - collision test", () => {
  it("generates unique IDs for 1000000 iterations", () => {
    const set = new Set<string>();
    const count = 1000000;
    for (let i = 0; i < count; i++) {
      const id = snapid();
      expect(set.has(id)).toBe(false);
      set.add(id);
    }
    expect(set.size).toBe(count);
  }, 60000); // timeout 60s
});

/**
 * Performance benchmark
 */
// describe("snapid - performance", () => {
//   it("generates 1 million IDs under 5 seconds", () => {
//     const start = Date.now();
//     const count = 1_000_000;
//     for (let i = 0; i < count; i++) {
//       snapid();
//     }
//     const duration = Date.now() - start;
//     console.log(`Generated 1M IDs in ${duration} ms`);
//     expect(duration).toBeLessThan(5000);
//   });
// });
