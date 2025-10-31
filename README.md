# Snapid

A **fast, secure, URL-safe, short unique ID generator** for Node.js, browser, and Deno.
Ideal for **database keys, tokens, URLs, logs, caches**, or any scenario where you need unique identifiers.

---

## Features

- **Zero dependencies** – plug and play
- **URL-safe** by default (Base58)
- **Configurable length** (`size`)
- **Optional timestamp prefix** for sortable IDs
- **Optional deterministic seed** for reproducible IDs
- **Supports Node.js, Browser, and Deno**
- **High-performance** – generate millions of IDs quickly

---

## Installation

```bash
npm install snapid
```

---

## Usage

```TypeScript
import { snapid } from "snapid";

// default usage
const id = snapid();
console.log(id); // e.g., "a7FgQwLx9Z"

// custom size
const id16 = snapid({ size: 16 });
console.log(id16);

// timestamp prefix (sortable)
const timestampId = snapid({ time: true });
console.log(timestampId);

// deterministic ID
const seededId = snapid({ seed: "user123" });
console.log(seededId);

// custom alphabet
const hexId = snapid({ alphabet: "hex", size: 12 });
console.log(hexId);

// append ID to a short URL
const shortUrl = `https://example.com/${snapid()}`;
console.log(shortUrl); // e.g., "https://example.com/a7FgQwLx9Z"

// create a referral code URL
const referralUrl = `https://example.com/ref/${snapid({ size: 8 })}`;
console.log(referralUrl); // e.g., "https://example.com/ref/3kPq9Xz1"

// generate a tracking link with timestamp prefix
const trackUrl = `https://example.com/track/${snapid({ time: true })}`;
console.log(trackUrl); // e.g., "8M2Fh7QaZx3a"

```

## Options

| Option     | Type                            | Default     | Description                 |
| ---------- | ------------------------------- | ----------- | --------------------------- |
| `size`     | `number`                        | `10`        | Length of the random part   |
| `time`     | `boolean`                       | `false`     | Prepend timestamp prefix    |
| `alphabet` | `'base58' \| 'base62' \| 'hex'` | `'base58'`  | Alphabet used for encoding  |
| `seed`     | `string`                        | `undefined` | Optional deterministic seed |

---

## Example Use Cases

- **Database primary keys**
- **Short URLs or referral codes**
- **Session or API tokens**
- **Cache keys**
- **Trace/log IDs for observability**
