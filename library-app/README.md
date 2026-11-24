# Library app containers (Part 12 — exercises 12.21 & 12.22)

Docker Compose setup for the GraphQL library app from Part 8.

Source code:

- Backend: [`nutshell part 8/library-backend`](../nutshell%20part%208/library-backend/)
- Frontend: [`nutshell part 8/library-frontend`](../nutshell%20part%208/library-frontend/)

## 12.21 — Development stack

Hot-reload frontend (Vite) + backend (`node --watch`) behind nginx:

```bash
docker compose -f compose.dev.yaml up --build
```

Open http://localhost:8081

## 12.22 — Production stack

Built frontend + production backend behind nginx:

```bash
docker compose -f compose.yaml up --build
```

Open http://localhost:8081  
Health: http://localhost:8081/health  
GraphQL: http://localhost:8081/graphql

## First-time login

1. Create a user with GraphQL mutation `createUser(username, favoriteGenre)`.
2. Login with password **`secret`** (hardcoded in the course app).

Example (browser console / GraphQL playground):

```graphql
mutation {
  createUser(username: "mluukkai", favoriteGenre: "refactoring") {
    username
    favoriteGenre
  }
}
```

```graphql
mutation {
  login(username: "mluukkai", password: "secret") {
    value
  }
}
```
