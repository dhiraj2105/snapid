/**
 * Return a timestamp prefix encoded in the given alphabet
 */
import { ALPHABETS } from "../constants";

export function getTimePrefix(
  alphabet: "base58" | "base62" | "hex" = "base58",
): string {
  const chars = ALPHABETS[alphabet];
  const now = Date.now(); // milliseconds
  let value = BigInt(now);
  let result = "";

  const base = BigInt(chars.length);
  while (value > 0) {
    result = chars[Number(value % base)] + result;
    value = value / base;
  }

  return result;
}
