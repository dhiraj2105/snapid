import { createRequire } from "module";
/**
 * Return a byte array of cryptographically secure random values or deterministic seed values.
 *
 * @param size - Number of bytes to generate.
 * @param seed - Optional seed used to create reproducible bytes.
 * @returns A byte array containing exactly `size` values.
 * @throws {RangeError} When `size` is not a valid non-negative integer.
 * @throws {Error} When no secure random source is available.
 */
export function getRandomBytes(size, seed) {
    if (!Number.isInteger(size) || size < 0) {
        throw new RangeError("size must be a non-negative integer");
    }
    const bytes = new Uint8Array(size);
    // An explicitly supplied seed, including an empty string, uses the deterministic PRNG.
    if (seed !== undefined) {
        const seedBytes = new TextEncoder().encode(seed);
        let h1 = 0xdeadbeef ^ seedBytes.length;
        let h2 = 0x41c6ce57 ^ seedBytes.length;
        // Mix every UTF-8 seed byte into two independent hash values.
        for (let i = 0; i < seedBytes.length; i++) {
            h1 = Math.imul(h1 ^ seedBytes[i], 0x85ebca6b);
            h2 = Math.imul(h2 ^ seedBytes[i], 0xc2b2ae35);
        }
        h1 = Math.imul(h1 ^ (h1 >>> 16), 0x7feb352d) ^ Math.imul(h2 ^ (h2 >>> 13), 0x846ca68c);
        h2 = Math.imul(h2 ^ (h2 >>> 16), 0x846ca68c) ^ Math.imul(h1 ^ (h1 >>> 16), 0x995b1b4c);
        let a = (h1 ^ h2) >>> 0;
        let b = (h2 ^ 0xdeadbeef) >>> 0;
        let c = (h1 ^ 0x41c6ce57) >>> 0;
        let d = (h2 ^ 0x9e3779b9) >>> 0;
        // Generate bytes with a small four-state arithmetic PRNG.
        for (let i = 0; i < size; i++) {
            a = (a + b) >>> 0;
            b = (b + c) >>> 0;
            c = (c + d) >>> 0;
            d = (d + a) >>> 0;
            bytes[i] = (d ^ (d >>> 8)) & 0xff;
        }
        return bytes;
    }
    // Node.js provides cryptographic randomness through its built-in crypto module.
    if (typeof process !== "undefined" && process.versions?.node) {
        try {
            const crypto = createRequire(import.meta.url)("node:crypto");
            return crypto.randomFillSync(bytes);
        }
        catch {
            // Continue to Web Crypto if a Node-compatible runtime cannot load the module.
        }
    }
    // Browsers and Deno expose the standard Web Crypto API.
    const webCrypto = globalThis.crypto;
    if (webCrypto) {
        return webCrypto.getRandomValues(bytes);
    }
    throw new Error("Secure random number generation is unavailable in this environment");
}
