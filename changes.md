# Changes

## Previous state

- The package exposed `dist/index.*`, but the build did not generate an `index` entrypoint.
- Random generation mixed Node and browser code and could leave seeded/unseeded buffers in inconsistent states.
- Seeded generation used a weak, runtime-local integer hash.
- Encoding mapped bytes with modulo rather than preserving a fully uniform byte sequence, and timestamp prefixes were not fixed-width.
- Configuration values were not validated.
- The baseline suite included a 1-million-ID collision test that took roughly 28 seconds.
- A standalone `test.js` duplicated package usage but was not included in the build or test structure.
- README and package metadata were only partially aligned with the compiled output.

## Changed

- Added a real package entrypoint at `src/index.ts` and fixed package `main`, `module`, `exports`, and declarations.
- Reworked random generation to use Node `randomFillSync` or Web Crypto, with a clear error when secure randomness is unavailable.
- Replaced seeded randomness with a deterministic, cross-runtime PRNG.
- Added exact `size` handling and fixed-width timestamp prefixes for sortable IDs.
- Added option validation for size, time, alphabet, and seed.
- Added exported defaults and constants for library consumers.
- Replaced the million-ID test with focused behavior, validation, sorting, seed, alphabet, and 10,000-ID uniqueness coverage.
- Removed the redundant root `test.js`.

## Added

- `src/index.ts` with complete package exports.
- `MAX_SIZE`, `DEFAULT_SIZE`, and option documentation.
- Tests for exact lengths, every alphabet, fixed-width timestamp sorting, deterministic seeds, invalid options, and uniqueness.
- Package usage documentation for named and default imports.

## Documentation and cleanup pass

- Removed all commented-out implementation blocks from source configuration and modules.
- Removed obsolete aliases and default exports from low-level utility modules.
- Added module and function documentation to constants, types, public API, random generation, encoding, and timestamp generation.
- Replaced comments with focused explanations of runtime behavior and sortability.
- Replaced the README with installation, API, option, security, runtime, and development documentation.
- Removed the unused benchmark package script and direct publishing/test dependencies.
- Added `examples/basic.mjs` and `examples/README.md` with runnable package usage.
- Added an `npm run example` command.
- Updated the publish workflow to remove outdated test descriptions and publish only after build and test steps.

## Release metadata

- Incremented the package and lockfile version from `1.0.7` to `1.0.8`.

## Version 1.0.9

- Bumped the package and lockfile version to `1.0.9`.
- Updated the documentation site's structured metadata and LLM references to the current release.

## Documentation website

- Added a responsive, dependency-free documentation site in `docs/` with examples, API reference, security notes, light/dark theme toggle, and copy-to-clipboard controls.
- Added SEO metadata, structured data, sitemap, robots file, and LLM/RAG-friendly `llms.txt` references.
- Added a GitHub Actions workflow to deploy `docs/` to GitHub Pages from the `main` branch.
- Linked the npm package homepage and project README to the documentation website.

## Documentation website

- Added a responsive, dependency-free documentation site in `docs/` with examples, API reference, security notes, light/dark theme toggle, and copy-to-clipboard controls.
- Added SEO metadata, structured data, sitemap, robots file, and LLM/RAG-friendly `llms.txt` references.
- Added a GitHub Actions workflow to deploy `docs/` to GitHub Pages from the `main` branch.
- Linked the npm package homepage and project README to the documentation website.
