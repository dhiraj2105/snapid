import snapid, { SnapId } from "../dist/index.js";

console.log("Default ID:", snapid());
console.log("Named compatibility API:", SnapId({ size: 12 }));
console.log("Base62 ID:", snapid({ alphabet: "base62", size: 12 }));
console.log("Hex ID:", snapid({ alphabet: "hex", size: 12 }));
console.log("Sortable ID:", snapid({ time: true, size: 12 }));
console.log("Seeded ID:", snapid({ seed: "example-user", size: 12 }));
