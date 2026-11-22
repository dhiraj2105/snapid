# Snapid

Snapid is a dependency-free, short identifier generator for Node.js, browsers, Deno, and JavaScript or TypeScript applications. It supports secure randomness, exact-length IDs, URL-safe alphabets, sortable timestamp prefixes, and reproducible seeded output.

## Features

- Secure cryptographic randomness in Node.js and Web Crypto environments
- Three URL-safe alphabets: Base58, Base62, and hexadecimal
- Exact random segment lengths from 1 to 1024 characters
- Optional fixed-width timestamp prefixes
- Reproducible identifiers through an optional seed
- Named, default, and backward-compatible exports
- First-class TypeScript declarations

## Installation

```bash
npm install snapid
```

## Quick start

```typescript
import snapid, { SnapId } from "snapid";

// Both APIs create a 10-character Base58 identifier.
const id = snapid();
const sameApi = SnapId();
```

## Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `number` | `10` | Exact length of the random segment. Values must be integers from 1 through 1024. |
| `time` | `boolean` | `false` | Adds a fixed-width timestamp prefix for sortable identifiers. |
| `alphabet` | `"base58" \| "base62" \| "hex"` | `"base58"` | Character set used by the identifier. |
| `seed` | `string` | `undefined` | Generates reproducible output for the same seed and options. |

## Examples

### Generate an exact-length identifier

```typescript
import snapid from "snapid";

const id = snapid({ size: 16 });
console.log(id);
```

### Generate a sortable timestamp ID

```typescript
import snapid from "snapid";

const id = snapid({ time: true, size: 12 });
console.log(id);
```

IDs generated with `time: true` contain a fixed-width prefix. Later timestamps sort after earlier timestamps when the same alphabet is used.

### Use a custom alphabet

```typescript
import snapid from "snapid";

const base62Id = snapid({ alphabet: "base62", size: 12 });
const hexId = snapid({ alphabet: "hex", size: 12 });
```

### Generate reproducible IDs

```typescript
import snapid from "snapid";

const first = snapid({ seed: "user-123", size: 12 });
const second = snapid({ seed: "user-123", size: 12 });

console.log(first === second); // true
```

Seeds are intended for reproducible generation and test fixtures. They are not cryptographic secrets and seeded IDs must not be used as unpredictable security tokens.

### Build short URLs

```typescript
import snapid from "snapid";

const shortUrl = `https://example.com/${snapid({ size: 8 })}`;
const referralUrl = `https://example.com/ref/${snapid({ size: 12 })}`;
```

## Public exports

```typescript
import snapid, {
  SnapId,
  ALPHABETS,
  DEFAULTS,
  DEFAULT_SIZE,
  MAX_SIZE,
  encodeBase,
  getRandomBytes,
  getTimePrefix,
} from "snapid";

import type { SnapIdOptions, AlphabetName } from "snapid";
```

- `snapid` and `SnapId` create identifiers.
- `ALPHABETS` contains the supported character sets.
- `DEFAULTS`, `DEFAULT_SIZE`, and `MAX_SIZE` describe package defaults and limits.
- `encodeBase`, `getRandomBytes`, and `getTimePrefix` expose individual utilities for advanced use.

## Runtime behavior

Node.js uses `node:crypto.randomFillSync`. Browsers and Deno use `globalThis.crypto.getRandomValues`. If neither is available, Snapid throws an error instead of silently producing weak identifiers.

Invalid option values throw `TypeError`. Invalid sizes throw `RangeError`.

## Development

```bash
npm install
npm test
npm run build
npm run example
```

Runnable source examples are available in [examples/](./examples).

## License

ISC
