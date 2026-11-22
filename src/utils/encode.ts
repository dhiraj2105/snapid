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
export function encodeBase(
  bytes: Uint8Array,
  alphabet: AlphabetName = "base58",
): string {
  if (typeof alphabet !== "string" || !(alphabet in ALPHABETS)) {
    throw new TypeError("alphabet must be one of: base58, base62, hex");
  }

  const chars = ALPHABETS[alphabet];
  let result = "";

  // Direct byte mapping keeps output length equal to the configured size.
  for (let i = 0; i < bytes.length; i++) {
    result += chars[bytes[i] % chars.length];
  }
  return result;
}
