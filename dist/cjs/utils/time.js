"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimePrefix = getTimePrefix;
/**
 * Return a timestamp prefix encoded in the given alphabet
 */
const constants_1 = require("../constants");
function getTimePrefix(alphabet = "base58") {
    const chars = constants_1.ALPHABETS[alphabet];
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
