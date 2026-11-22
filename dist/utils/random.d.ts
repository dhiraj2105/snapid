/**
 * Return a byte array of cryptographically secure random values or deterministic seed values.
 *
 * @param size - Number of bytes to generate.
 * @param seed - Optional seed used to create reproducible bytes.
 * @returns A byte array containing exactly `size` values.
 * @throws {RangeError} When `size` is not a valid non-negative integer.
 * @throws {Error} When no secure random source is available.
 */
export declare function getRandomBytes(size: number, seed?: string): Uint8Array;
