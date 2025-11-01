import type { SnapIdOptions } from "./types.js";
/**
 * Generate a fast, secure, URL-safe unique ID
 * Optimized for high performance
 */
export declare function snapid(opts?: SnapIdOptions): string;
export { snapid as SnapId };
export default snapid;
