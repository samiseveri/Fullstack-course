# Full Stack open CI/CD

This project is the **Part 11 (CI/CD)** pokedex exercise app from Full Stack Open.

Fork or clone the course repo and complete the exercises in the [Continuous Integration MOOC module](https://courses.mooc.fi/org/uh-cs/courses/full-stack-open-continuous-integration) (Part 11 material on fullstackopen.com links there).

## Submission links (exercises 21–23)

- **Pokedex repository (this monorepo):** https://github.com/samiseveri/Fullstack-course  
  App path: [`nutshell part 11/full-stack-open-pokedex`](./)
- **Deployed pokedex:** https://samiseveri-pokedex-cicd.fly.dev  
  Health: https://samiseveri-pokedex-cicd.fly.dev/health — version: `/version`
- **Own CI/CD app repository (exercises 21–22):** https://github.com/samiseveri/Fullstack-course  
  Pipelines live under [`.github/workflows/`](../../.github/workflows/) (e.g. Patientor / bloglist / pokedex workflows).

## Commands

From this directory:

- `npm install` — install dependencies
- `npm start` — webpack dev server
- `npm test` — Jest tests
- `npm run eslint` — ESLint
- `npm run build` — production webpack build into `dist/`
- `npm run start-prod` — serve `dist/` with Express (after `npm run build`)
- `npm run deploy` — build and deploy with Fly.io CLI (local)
- `npm run deploy:full` — lint, build, test, then deploy (local)

## Health and version

Production server (`app.js`):

- `GET /health` → `ok`
- `GET /version` → value from `package.json` `version` (bump for release tagging exercises)

## GitHub Actions (monorepo)

Workflows must live in the **repository root** `.github/workflows/`. This monorepo uses:

- [`.github/workflows/pokedex-pipeline.yml`](../../.github/workflows/pokedex-pipeline.yml) with `working-directory: nutshell part 11/full-stack-open-pokedex`

The pipeline runs **lint → build → test** on push/PR to `main` or `master` (when pokedex paths change). **Deploy** runs on push to `main`/`master` after tests pass.

Required GitHub secret:

- `FLY_API_TOKEN` — from [Fly.io](https://fly.io) (`fly tokens create deploy`)

## Fly.io deployment

1. Install [flyctl](https://fly.io/docs/hands-on/install-flyctl/) (`winget install Fly-io.flyctl`) and run `fly auth login`.
2. App name in `fly.toml`: `samiseveri-pokedex-cicd` (already created on Fly).
3. Add GitHub repo secret `FLY_API_TOKEN`: run `flyctl tokens create deploy -a samiseveri-pokedex-cicd` and paste the token at [Actions secrets](https://github.com/samiseveri/Fullstack-course/settings/secrets/actions).
4. Push to `main`/`master` to deploy via CI, or run `npm run deploy` locally (see `scripts/deploy-fly.ps1`).

Release versioning (course exercise): bump `"version"` in `package.json`, commit, tag (e.g. `git tag -a v1.0.1`), push the tag, and verify https://samiseveri-pokedex-cicd.fly.dev/version .

## Local verification

```bash
npm ci
npm run eslint
npm run build
npm test
npm run start-prod
# curl http://localhost:5000/health
# curl http://localhost:5000/version
```
