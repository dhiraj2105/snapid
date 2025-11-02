/**
 * Fast encode bytes into string using given alphabet
 * Direct mapping for speed instead of BigInt conversion
 */
export declare function encodeBase(bytes: Uint8Array, alphabet?: "base58" | "base62" | "hex"): string;
export default encodeBase;
export { encodeBase as EncodeBase };
