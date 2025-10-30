// import { ALPHABETS } from "../constants";

// /**
//  * Encode a byte array into a string using the given alphabet
//  */
// export function encodeBase(
//   bytes: Uint8Array,
//   alphabet: "base58" | "base62" | "hex" = "base58",
// ): string {
//   const chars = ALPHABETS[alphabet];
//   let result = "";
//   let value = BigInt(
//     "0x" + [...bytes].map((b) => b.toString(16).padStart(2, "0")).join(""),
//   );

//   const base = BigInt(chars.length);
//   while (value > 0) {
//     result = chars[Number(value % base)] + result;
//     value = value / base;
//   }

//   return result || chars[0];
// }

import { ALPHABETS } from "../constants";

/**
 * Fast encode bytes into string using given alphabet
 * Direct mapping for speed instead of BigInt conversion
 */
export function encodeBase(
  bytes: Uint8Array,
  alphabet: "base58" | "base62" | "hex" = "base58",
): string {
  const chars = ALPHABETS[alphabet];
  const len = chars.length;
  let result = "";

  // Map each byte to a char in the alphabet
  for (let i = 0; i < bytes.length; i++) {
    result += chars[bytes[i] % len];
  }

  return result;
}
