/** Supported character sets. */
export const ALPHABETS = {
    base58: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz",
    base62: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    hex: "0123456789abcdef",
};
/** Default options used when an option is not provided. */
export const DEFAULTS = {
    size: 10,
    time: false,
    alphabet: "base58",
};
/** Default random segment length. */
export const DEFAULT_SIZE = 10;
/** Maximum random segment length accepted by Snapid. */
export const MAX_SIZE = 1024;
