# SKELETON_typescript_express.md — TypeScript Express Skeleton Implementation

## Overview

This document describes the skeleton implementation for TypeScript using Express. It is specific to 
this language/framework combination and should be referenced when:

- Creating a new session using the TypeScript template
- Understanding what files exist in the TypeScript template and what each contains
- Implementing the function stubs during an interview session

For universal skeleton structure and function categories that apply to ALL templates, 
see docs/STRUCTURE_skeleton.md.

---

## Template Structure

```
templates/typescript/
├── CLAUDE.md                       — interview session context
├── README.md                       — quick reference for TypeScript template
├── package.json                    — Node.js dependencies and scripts
├── tsconfig.json                   — TypeScript compiler configuration
├── config.yaml                     — universal application config
├── memory/
│   └── MEMORY.md                   — placeholder, auto-written at END SESSION
├── plan/
│   ├── scratch.md                  — empty, for quick notes during session
│   ├── plan.md                     — empty, for candidate approach before prompting
│   └── WORKORDER.md                — empty, Claude Code generates this
├── inputs/                         — empty, for input data files (CSV, JSON, etc.)
├── outputs/                        — empty, where fileIO.ts writes results (created at runtime)
├── logs/                           — empty, created at runtime by logging
├── tests/                          — empty, for test files (optional)
├── data/                           — empty, for sample input files
└── src/
    ├── api/
    │   └── server.ts               — Express application entry point
    ├── db/
    │   └── database.ts             — SQLite database operations
    └── files/
        └── fileIO.ts               — file I/O operations (CSV, JSON, markdown, etc.)
```

---

## Skeleton Files

### Configuration Files

#### package.json
Node.js package configuration and dependencies. Includes:
- `"express": "^4.18.0"` — web framework
- `"better-sqlite3": "^9.0.0"` — synchronous SQLite driver
- `"typescript": "^5.3.0"` — TypeScript compiler
- `"ts-node": "^10.9.0"` — TypeScript execution
- Other common utilities (already listed, some commented out)

Scripts section includes:
- `"dev": "ts-node src/api/server.ts"` — run development server
- `"build"` — compile TypeScript to JavaScript (if needed)

#### tsconfig.json
TypeScript compiler configuration. Pre-configured with:
- `"target": "ES2020"` — modern JavaScript target
- `"module": "commonjs"` — Node.js module format
- `"strict": true"` — strict type checking enabled
- All files in `src/` compile to `dist/` (or run directly with ts-node)

#### config.yaml
Universal application configuration (see STRUCTURE_skeleton.md). The TypeScript skeleton reads 
this file at startup and makes config available to all modules.

---

## Code Skeleton Files

### src/api/server.ts

**Purpose:** Express application entry point. Sets up the web server, loads configuration, 
initializes logging, and defines route handlers.

**Key components:**
- Express app instance
- Middleware setup (JSON parsing, etc.)
- Configuration loading from config.yaml
- Logging initialization
- Route handler function stubs for:
  - `GET /` — render home page (return HTML)
  - `GET /api/items` — list all records
  - `POST /api/items` — create new record
  - `GET /api/items/{id}` — get single record
  - `PUT /api/items/{id}` — update record
  - `DELETE /api/items/{id}` — delete record
- Server startup on configured host/port

**Imports included:**
- `import express from 'express'`
- `import fs from 'fs'` and `import yaml from 'yaml'` (or similar for config)
- `import Database from 'better-sqlite3'` (commented, for database operations)
- Type imports for Request, Response, NextFunction

**Function stubs:**
- `loadConfig(): Config` — load and return config.yaml as object
- Route handler functions (one stub per route above)
- Helper function for rendering templates

**Naming convention:** `camelCase` (e.g., `loadConfig()`, `handleGetItems()`)

**No implementation code** — candidate fills in during session.

---

### src/db/database.ts

**Purpose:** SQLite database operations module. ALL database access flows through this module.

**Key components:**
- SQLite connection initialization (using better-sqlite3 for synchronous API)
- Schema creation if needed
- Query functions (see STRUCTURE_skeleton.md for full list):
  - `initDb(config: Config): Database` — create connection and initialize schema
  - `createTable(db: Database, tableName: string, schema: string)` — create table
  - `insertRecord(db: Database, tableName: string, data: any)` — add record
  - `queryAll(db: Database, tableName: string)` — get all records
  - `queryById(db: Database, tableName: string, recordId: number)` — get one record
  - `updateRecord(db: Database, tableName: string, recordId: number, data: any)` — modify record
  - `deleteRecord(db: Database, tableName: string, recordId: number)` — remove record
  - `closeConnection(db: Database)` — clean up connection

**Imports included:**
- `import Database from 'better-sqlite3'`
- Type definitions for database operations
- Standard library: none required beyond better-sqlite3

**Function stubs:**
- One stub per database function listed above
- Each includes JSDoc with parameter types, return type, and behavior description
- Comments explaining typical error cases

**Naming convention:** `camelCase` (e.g., `queryById()`, `insertRecord()`)

**Type definitions:**
- Use TypeScript interfaces for type safety (e.g., `interface Record { id: number; ... }`)
- Strongly typed function signatures

**No implementation code** — candidate fills in during session.

---

### src/files/fileIO.ts

**Purpose:** File I/O operations module. ALL file access flows through this module.

**Supported formats:** CSV, JSON, JSONL, Markdown, plain text

**Key components:**
- File reading/writing functions for each format (see STRUCTURE_skeleton.md):
  - `readFile(filePath: string): string` — read plain text
  - `writeFile(filePath: string, content: string): boolean` — write plain text
  - `readCsv(filePath: string): Record[]` — read CSV as array of objects
  - `writeCsv(filePath: string, records: Record[], headers: string[])` — write to CSV
  - `readJson(filePath: string): any` — read JSON file
  - `writeJson(filePath: string, data: any): boolean` — write object as JSON
  - `readJsonl(filePath: string): any[]` — read newline-delimited JSON
  - `writeJsonl(filePath: string, records: any[])` — write list as JSONL
  - `readMarkdown(filePath: string): string` — read markdown file
  - `writeMarkdown(filePath: string, content: string): boolean` — write markdown file
  - `listFiles(directoryPath: string, pattern?: string): string[]` — list files with optional pattern
  - `fileExists(filePath: string): boolean` — check if file exists
  - `deleteFile(filePath: string): boolean` — delete a file
- Output path resolution from config.yaml

**Imports included:**
- `import fs from 'fs'`
- `import csv` library (commented, for CSV operations)
- Type definitions: `import path from 'path'`
- Standard library: `fs/promises` (async version, commented)

**Function stubs:**
- One stub per file I/O function listed above
- Each includes JSDoc with parameter types, return type, and behavior
- Output functions resolve paths relative to `outputs/` folder from config

**Naming convention:** `camelCase` (e.g., `readCsv()`, `writeJson()`)

**Synchronous operations:** All file I/O is synchronous (using `fs` not `fs.promises`) for 
simplicity under time pressure, consistent with better-sqlite3 choice.

**No implementation code** — candidate fills in during session.

---

## Function Naming Conventions

All TypeScript functions use `camelCase`:
- Function names: `queryById()`, `logInfo()`, `readCsv()`
- Variables: `userName`, `recordId`, `configObject`
- Classes: `UserModel` (PascalCase)
- Constants: `MAX_RETRIES`, `DATABASE_PATH` (UPPER_SNAKE_CASE)
- Interfaces: `User`, `Config`, `RequestBody` (PascalCase)

---

## Error Handling Conventions

TypeScript skeleton uses exception-based error handling:
- Functions throw `Error` or specific error types on failure
- Express route handlers wrap logic in try/catch and return appropriate HTTP status codes:
  - 400 Bad Request — invalid input
  - 404 Not Found — record not found
  - 500 Internal Server Error — unexpected error
- Database functions throw exceptions if queries fail
- File I/O functions throw exceptions if file not found or permission denied
- Exceptions are logged via `logError()` before being re-raised or handled

Type safety: Use TypeScript types to catch errors at compile time.

---

## Logging Implementation

All logging goes through the logging module in the skeleton.

**Logging functions:**

```typescript
function logInfo(sourceFunction: string, message: string): void {
  /**
   * Log info-level message with standard format.
   * Format: {timestamp} | {source_function} | {message}
   */
}

function logDebug(sourceFunction: string, message: string): void {
  /**
   * Log debug-level message with standard format.
   * Only shown if config.yaml logging.level is DEBUG.
   */
}

function logError(sourceFunction: string, message: string, exception?: Error): void {
  /**
   * Log error-level message with standard format.
   * Includes exception details if exception object provided.
   */
}
```

**Implementation pattern:**
- Create a logging utility module or functions in a shared file
- Implement the three functions to match standard format
- Each function formats message with ISO 8601 timestamp and source function name
- Log level (INFO, DEBUG, ERROR) controls what gets written
- Write logs to file path from config.yaml

---

## Configuration Loading

The skeleton loads `config.yaml` at startup via a `loadConfig()` function.

**Config sections used:**
- `logging.level` — controls logging verbosity (INFO, DEBUG, ERROR)
- `logging.output_file` — file path for log output
- `database.path` — SQLite database file path
- `api.host` and `api.port` — where to run the Express server
- `outputs.path` — directory for file I/O operations

**Access pattern:**
```typescript
interface Config {
  logging: { level: string; output_file: string; format: string };
  database: { path: string };
  api: { host: string; port: number };
  outputs: { path: string };
}

const config = loadConfig();
const dbPath = config.database.path;
const logLevel = config.logging.level;
const outputDir = config.outputs.path;
```

All three skeleton modules (src/api/server.ts, src/db/database.ts, src/files/fileIO.ts) receive 
or load config and use it rather than hardcoding values.

---

## Running the TypeScript Template

Once implemented:

```bash
# Install dependencies
npm install

# Run the development server (with auto-restart on file changes)
npm run dev

# Or compile and run
npm run build
node dist/api/server.js
```

Server runs at `http://127.0.0.1:8000` (or configured host/port).

---

## TypeScript Features

The skeleton takes advantage of TypeScript features:
- **Type annotations** on all function parameters and returns
- **Interfaces** for structured data (Record, Config, etc.)
- **Enums** for constants (if helpful for logging levels, etc.)
- **Strict mode** enabled (tsconfig.json)
- **No `any` types** — use specific types instead

---

## Testing (Optional)

The template includes an empty `tests/` folder. If adding tests during the session:

- Test framework: Jest (or Vitest, as preferred)
- Test file naming: `*.test.ts` (Jest convention)
- Test functions: `test('description', () => { ... })`
- Mock database for unit tests (don't use real SQLite)
- Run tests: `npm test`

---

## Quick Start for Interview Sessions

When creating a new TypeScript interview session:

1. Read this document and docs/STRUCTURE_skeleton.md
2. Review the inline comments in each skeleton file
3. Compile TypeScript: `tsc` (or let ts-node do it)
4. Implement function stubs based on the interview prompt
5. Use `camelCase` for all function and variable names
6. Use TypeScript types on all functions and variables
7. Throw errors on failures (don't return error codes)
8. Log via `logInfo()`, `logDebug()`, `logError()` functions
9. Load and use config.yaml for all configuration
10. Access database only through src/db/database.ts
11. Access files only through src/files/fileIO.ts
12. Use better-sqlite3 for synchronous database operations (simpler mental model)

See the template's CLAUDE.md for the interview workflow.
