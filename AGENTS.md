# AGENTS.md

## Cursor Cloud specific instructions

This repository is a **"Full Stack Open" coursework monorepo**. It is **not one product**: `part0`–`part7` are independent mini-projects, each installed and run on its own with **npm** (Node 22). There is no root orchestration. `part0` is markdown-only (no code).

Standard per-project commands live in each part's `package.json` `scripts`. In short:
- Vite frontends (`part1/introdemo`, `part2/notes-app`, `part5`): `npm run dev` (port 5173), `npm run build`, `npm run lint`.
- `part3` (Express phonebook API, in-memory): `npm run dev` (`node --watch`) / `npm start`, listens on `:3001`. No real tests.
- `part4` (Express + Mongoose notes API): `npm run dev` (nodemon), `npm test` (jest). Needs MongoDB (see below).
- CRA apps (`part6/redux-anecdotes`, `part6/unicafe-redux`, `part7`): `npm start` (port 3000), `npm run build`, tests via `CI=true npx react-scripts test` to run once (bare `npm test` is watch mode).

### Non-obvious caveats
- **Committed `node_modules`**: `part3/`, `part4/`, and the repo root commit their `node_modules` to git, and every `.bin` shim (e.g. `jest`, `nodemon`) is stored with a non-executable mode (`100644`). A fresh checkout therefore breaks `npm test` / `nodemon` with `sh: 1: <tool>: Permission denied`. The startup update script re-adds the exec bit (`chmod -R u+x .../node_modules/.bin`). If you re-checkout or `git reset` those paths, re-run that chmod.
- **Port 3001 collision**: `json-server` (mock API from `db.json`), `part3`, and `part4` all default to `:3001`. Run only one at a time.
- **MongoDB is unavailable in this Cloud environment.** `part4` needs MongoDB on `mongodb://localhost:27017`, but the egress firewall blocks `*.mongodb.org` / `*.mongodb.com` and Docker Hub's blob CDN (registry/manifest API works, but blob/config downloads are connection-reset). So MongoDB cannot be `apt`-installed nor pulled as a Docker image here. Consequently `part4`'s app runtime and `tests/note_api.test.js` (DB integration) cannot run until either egress is opened to MongoDB's domains + Docker Hub CDN, or a MongoDB binary/image is baked into the environment base. `part4`'s pure unit tests still pass offline: `cd part4 && npx jest average reverse`.
- **Docker** is installed in the base (fuse-overlayfs storage driver, iptables-legacy, `containerd-snapshotter` disabled for Docker 29) and `dockerd` can start, but image pulls fail due to the same blob-CDN egress block — don't rely on Docker images here.

### Pre-existing code issues (NOT environment problems — do not "fix" as part of setup)
- `part2/notes-app/services/note.js` and `services/persons.js` are misplaced CommonJS **Mongoose models** (not axios services), so the part2 frontend's `personService.getAll()` is undefined and it can't load data. This also causes 4 `no-undef` lint errors.
- `part4/controllers/notes.js` implements only `DELETE /api/notes/:id`; the GET/POST/PUT tests in `tests/note_api.test.js` reference routes that don't exist (and also need MongoDB).
- CRA `src/App.test.js` in `part6/*` is the default boilerplate asserting "learn react" text, which the actual apps don't render, so that one test fails.
- `part5` has 2 `no-unused-vars` lint errors in `src/App.jsx`.
