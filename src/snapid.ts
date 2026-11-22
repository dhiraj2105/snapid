import { ALPHABETS, DEFAULTS, MAX_SIZE } from "./constants.js";
import type { SnapIdOptions } from "./types.js";
import { encodeBase } from "./utils/encode.js";
import { getRandomBytes } from "./utils/random.js";
import { getTimePrefix } from "./utils/time.js";

/**
 * Generate a short identifier using secure random bytes.
 *
 * @param options - Optional length, alphabet, timestamp, and seed settings.
 * @returns A URL-safe identifier.
 * @throws {TypeError} When an option has an unsupported type or value.
 * @throws {RangeError} When `size` is outside the supported range.
 */
export function snapid(options: SnapIdOptions = {}): string {
  if (options === null || typeof options !== "object") {
    throw new TypeError("Snap ID options must be an object");
  }

  const { size, time, alphabet, seed } = { ...DEFAULTS, ...options };

  if (!Number.isInteger(size) || size < 1 || size > MAX_SIZE) {
    throw new RangeError(`size must be an integer from 1 through ${MAX_SIZE}`);
  }
  if (typeof time !== "boolean") {
    throw new TypeError("time must be a boolean");
  }
  if (typeof alphabet !== "string" || !(alphabet in ALPHABETS)) {
    throw new TypeError("alphabet must be one of: base58, base62, hex");
  }
  if (seed !== undefined && typeof seed !== "string") {
    throw new TypeError("seed must be a string");
  }

  // Seeded generation is deterministic; regular generation uses OS/browser randomness.
  const bytes = getRandomBytes(size, seed);
  const randomSegment = encodeBase(bytes, alphabet);

  // A timestamp prefix makes IDs created later sort after IDs created earlier.
  const timestampSegment = time ? getTimePrefix(alphabet) : "";
  return timestampSegment + randomSegment;
}

/** Backward-compatible named alias for {@link snapid}. */
export const SnapId = snapid;

/** Default export for convenience. */
export default snapid;
