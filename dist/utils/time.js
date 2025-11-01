/**
 * Return a timestamp prefix encoded in the given alphabet
 */
import { ALPHABETS } from "../constants.js";
export function getTimePrefix(alphabet = "base58") {
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
export default getTimePrefix;
export { getTimePrefix as GettimePrefix };
