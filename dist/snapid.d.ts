import type { SnapIdOptions } from "./types.js";
/**
 * Generate a short identifier using secure random bytes.
 *
 * @param options - Optional length, alphabet, timestamp, and seed settings.
 * @returns A URL-safe identifier.
 * @throws {TypeError} When an option has an unsupported type or value.
 * @throws {RangeError} When `size` is outside the supported range.
 */
export declare function snapid(options?: SnapIdOptions): string;
/** Backward-compatible named alias for {@link snapid}. */
export declare const SnapId: typeof snapid;
/** Default export for convenience. */
export default snapid;
