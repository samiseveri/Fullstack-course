# Part 13 — Relational databases

Sequelize blog API exercises from Full Stack Open Part 13.

## Repository

Submit this monorepo: https://github.com/samiseveri/Fullstack-course

## Chapters

| Chapter | Path | CI |
|--------|------|-----|
| 2 | [`chapter 2/`](chapter%202/) | local / course exercises |
| 3 | [`chapter 3/`](chapter%203/) | [`.github/workflows/test.yml`](chapter%203/.github/workflows/test.yml) |
| 4 | [`chapter 4/`](chapter%204/) | [`.github/workflows/test.yaml`](chapter%204/.github/workflows/test.yaml) and root [`.github/workflows/test.yaml`](../../.github/workflows/test.yaml) |

## Run chapter 4 tests locally

Requires PostgreSQL and `TEST_DATABASE_URL` (see chapter 4 `.env.example` if present).

```bash
cd "chapter 4"
npm ci
npm test
```
