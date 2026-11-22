/** Supported character sets. */
export declare const ALPHABETS: {
    readonly base58: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
    readonly base62: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    readonly hex: "0123456789abcdef";
};
/** Default options used when an option is not provided. */
export declare const DEFAULTS: {
    size: number;
    time: boolean;
    alphabet: "base58";
};
/** Default random segment length. */
export declare const DEFAULT_SIZE = 10;
/** Maximum random segment length accepted by Snapid. */
export declare const MAX_SIZE = 1024;
