// import { getRandomBytes } from "./utils/random";
// import { encodeBase } from "./utils/encode";
// import { getTimePrefix } from "./utils/time";
// import { DEFAULTS } from "./constants";
// import type { SnapIdOptions } from "./types";
// /**
//  * Generate a unique, short, URL-safe ID
//  * @param opts - configuration options
//  * @returns string ID
//  */
// export function snapid(opts: SnapIdOptions = {}): string {
//   const { size, time, alphabet, seed } = { ...DEFAULTS, ...opts };
//   // Timestamp prefix if requested
//   const prefix = time ? getTimePrefix(alphabet) : "";
//   // Random bytes
//   const bytes = getRandomBytes(size, seed);
//   // Encode random bytes
//   const encoded = encodeBase(bytes, alphabet);
//   return prefix + encoded;
// }
import { getRandomBytes } from "./utils/random";
import { encodeBase } from "./utils/encode";
import { getTimePrefix } from "./utils/time";
import { DEFAULTS } from "./constants";
/**
 * Generate a fast, secure, URL-safe unique ID
 * Optimized for high performance
 */
export function snapid(opts = {}) {
    const { size, time, alphabet, seed } = { ...DEFAULTS, ...opts };
    // Timestamp prefix if requested
    const prefix = time ? getTimePrefix(alphabet) : "";
    // Random bytes
    const bytes = getRandomBytes(size, seed);
    // Fast encoding
    const encoded = encodeBase(bytes, alphabet);
    return prefix + encoded;
}
