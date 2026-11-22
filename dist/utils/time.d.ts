import type { AlphabetName } from "./encode.js";
/**
 * Return the current Unix timestamp encoded in a fixed-width, sortable prefix.
 *
 * @param alphabet - Character set used for timestamp encoding.
 * @returns A padded timestamp prefix.
 * @throws {TypeError} When `alphabet` is not supported.
 */
export declare function getTimePrefix(alphabet?: AlphabetName): string;
