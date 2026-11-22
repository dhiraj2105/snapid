import { ALPHABETS } from "../constants.js";
/** Fixed character widths keep timestamp prefixes lexicographically sortable. */
const TIMESTAMP_WIDTHS = {
    base58: 7,
    base62: 7,
    hex: 13,
};
/**
 * Return the current Unix timestamp encoded in a fixed-width, sortable prefix.
 *
 * @param alphabet - Character set used for timestamp encoding.
 * @returns A padded timestamp prefix.
 * @throws {TypeError} When `alphabet` is not supported.
 */
export function getTimePrefix(alphabet = "base58") {
    if (typeof alphabet !== "string" || !(alphabet in ALPHABETS)) {
        throw new TypeError("alphabet must be one of: base58, base62, hex");
    }
    const chars = ALPHABETS[alphabet];
    let value = BigInt(Date.now());
    let result = "";
    // Convert milliseconds to the selected base, most significant digit first.
    const base = BigInt(chars.length);
    while (value > 0) {
        result = chars[Number(value % base)] + result;
        value = value / base;
    }
    return result.padStart(TIMESTAMP_WIDTHS[alphabet], chars[0]);
}
