import { ALPHABETS } from "../constants.js";
export type AlphabetName = keyof typeof ALPHABETS;
/**
 * Encode one byte into exactly one character from a named alphabet.
 *
 * @param bytes - Source bytes to encode.
 * @param alphabet - Character set used for encoding.
 * @returns Characters in the same order as the source bytes.
 * @throws {TypeError} When `alphabet` is not supported.
 */
export declare function encodeBase(bytes: Uint8Array, alphabet?: AlphabetName): string;
