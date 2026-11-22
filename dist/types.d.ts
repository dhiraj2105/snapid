export interface SnapIdOptions {
    /** Random segment length. Accepts whole numbers from 1 through 1024. */
    size?: number;
    /** Prepend a fixed-width, sortable timestamp segment. */
    time?: boolean;
    /** Character set used for the timestamp and random segments. */
    alphabet?: "base58" | "base62" | "hex";
    /** Optional deterministic seed. */
    seed?: string;
}
