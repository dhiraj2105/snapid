/**
 * Get random bytes securely
 * Works in Node.js and Browser
 */
import { createRequire } from "module";
export function getRandomBytes(size, seed) {
    let bytes = new Uint8Array(size);
    const require1 = createRequire(import.meta.url);
    // Node.js
    if (typeof process !== "undefined" && process.versions?.node) {
        const crypto = require1("crypto");
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
export default getRandomBytes;
export { getRandomBytes as GetRandomBytes };
