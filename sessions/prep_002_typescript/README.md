# TypeScript/Express Interview Template

Quick reference for this template stack.

## Stack

- **Backend:** Express + TypeScript
- **Runtime:** Node.js
- **Database:** SQLite via better-sqlite3
- **No ORM**

## Files

- **src/api/server.ts** — Express application, route handlers
- **src/db/database.ts** — SQLite operations
- **src/files/fileIO.ts** — File I/O (CSV, JSON, markdown, etc.)
- **config.yaml** — Application configuration (logging, database, api, outputs)

## To Start

```bash
npm install
npm run dev
```

Server runs at `http://127.0.0.1:8000`

## Conventions

- All business logic in the backend — keep any HTML output thin
- All database access through src/db/database.ts — no SQL elsewhere
- All file I/O through src/files/fileIO.ts
- Explicit TypeScript types on all functions — no `any`
- camelCase for all function and variable names
- Synchronous operations (better-sqlite3, fs not fs/promises)
