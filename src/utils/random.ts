/**
 * Get random bytes securely
 * Works in Node.js and Browser
 */
export function getRandomBytes(size: number, seed?: string): Uint8Array {
  let bytes = new Uint8Array(size);

  // Node.js
  if (typeof process !== "undefined" && process.versions?.node) {
    const crypto = require("crypto");
    if (!seed) {
      return crypto.randomBytes(size);
    }
  }

  // Browser / fallback
  if (typeof window !== "undefined" && window.crypto) {
    window.crypto.getRandomValues(bytes);
  }

  // If seed is provided, use deterministic PRNG
  if (seed) {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash << 5) - hash + seed.charCodeAt(i);
      hash |= 0;
    }
    for (let i = 0; i < size; i++) {
      hash = (hash * 16807) % 2147483647;
      bytes[i] = hash % 256;
    }
  }

  return bytes;
}
