"use strict";
// import { getRandomBytes } from "./utils/random";
// import { encodeBase } from "./utils/encode";
// import { getTimePrefix } from "./utils/time";
// import { DEFAULTS } from "./constants";
// import type { SnapIdOptions } from "./types";
Object.defineProperty(exports, "__esModule", { value: true });
exports.snapid = snapid;
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
const random_1 = require("./utils/random");
const encode_1 = require("./utils/encode");
const time_1 = require("./utils/time");
const constants_1 = require("./constants");
/**
 * Generate a fast, secure, URL-safe unique ID
 * Optimized for high performance
 */
function snapid(opts = {}) {
    const { size, time, alphabet, seed } = { ...constants_1.DEFAULTS, ...opts };
    // Timestamp prefix if requested
    const prefix = time ? (0, time_1.getTimePrefix)(alphabet) : "";
    // Random bytes
    const bytes = (0, random_1.getRandomBytes)(size, seed);
    // Fast encoding
    const encoded = (0, encode_1.encodeBase)(bytes, alphabet);
    return prefix + encoded;
}
