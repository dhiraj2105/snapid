export interface SnapIdOptions {
  size?: number; // random segment length
  time?: boolean; // prepend timestamp
  alphabet?: "base58" | "base62" | "hex";
  seed?: string; // deterministic optional
}
