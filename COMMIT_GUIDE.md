# Commit Guide — npm Downloads Analytics

This guide covers only the latest change set: the npm downloads statistic on the documentation site and release version `1.0.10`.

## Commit messages by file

- `docs/index.html` — `feat: show recent npm downloads in documentation`
- `docs/script.js` — `feat: fetch and display npm download statistics`
- `docs/styles.css` — `style: add compact npm downloads statistic`
- `docs/llms.txt` — `docs: update documented release to 1.0.10`
- `docs/llms-full.txt` — `docs: update full reference release version`
- `package.json` — `chore: bump package version to 1.0.10`
- `package-lock.json` — `chore: sync lockfile version to 1.0.10`
- `changes.md` — `docs: record npm analytics and 1.0.10 release`
- `COMMIT_GUIDE.md` — `docs: add commit and release instructions for 1.0.10`
- `.gitignore` — `chore: track the release commit guide`

## Suggested single commit

Commit these related changes together:

```text
feat: add npm downloads statistic and release 1.0.10
```

## Test, push, and publish

Publishing is handled by GitHub Actions when the `v1.0.10` tag is pushed. Run:

```bash
npm test
npm run build
npm run example
git add .gitignore COMMIT_GUIDE.md changes.md package.json package-lock.json docs/index.html docs/script.js docs/styles.css docs/llms.txt docs/llms-full.txt
git commit -m "feat: add npm downloads statistic and release 1.0.10"
git push origin main
git tag v1.0.10
git push origin v1.0.10
```

Pushing `main` deploys the documentation site. Pushing `v1.0.10` starts the npm publish workflow; confirm the GitHub Actions secret `NPM_TOKEN` is configured before tagging. The publish workflow also checks that the tag version matches `package.json`.
