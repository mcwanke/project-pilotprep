# STRUCTURE_skeleton.md — Universal Skeleton Structure and Functions

## Purpose

This document defines the universal folder structure, files, and function categories that apply to 
ALL template environments, regardless of language or purpose. It serves as the source of truth for 
what every skeleton should contain and what patterns every skeleton should implement.

Language-specific implementation details (naming conventions, import patterns, error handling) are 
documented in individual SKELETON_*.md files. See docs/ for SKELETON_python_fastapi.md, 
SKELETON_typescript_express.md, and similar language/target-specific guides.

---

## Universal Skeleton Folder Structure

Every template includes this core structure:

```
template/
├── CLAUDE.md                       — interview session context and behavior rules
├── README.md                       — quick reference for this template
├── config.yaml                     — application configuration (not a stub — actual values)
├── memory/
│   └── MEMORY.md                   — placeholder, overwritten at END SESSION
├── plan/
│   ├── scratch.md                  — empty, quick notes during session
│   ├── plan.md                     — empty, candidate approach before prompting
│   └── WORKORDER.md                — empty, Claude Code generates this
├── inputs/                         — empty, for input data files during session
├── outputs/                        — empty, where file I/O functions write results
├── logs/                           — empty, created at runtime by logging system
├── tests/                          — empty, for test files (optional per template)
└── [language/framework-specific folders below]
```

### Folder Purposes

- **memory/**: Stores session context. Auto-written at END SESSION.
- **plan/**: Candidate thinking artifacts. Populated during session per workflow.
- **inputs/**: Input data files (CSV, JSON, etc.) for the session to process.
- **outputs/**: Generated output files from file I/O operations.
- **logs/**: Application logs created at runtime by logging functions.
- **tests/**: Test files for the skeleton code (optional, depends on template type).

### Language/Framework-Specific Folders

These vary by template purpose. See individual SKELETON_*.md files for what's included:

- **Web/API templates** add: `api/`, `db/`, `files/`, `templates/` (or language equivalent)
- **CLI templates** add: `main/` or entry point folder, `logic/` or `commands/`
- **Database-only templates** add: `db/`, `files/` (no API routes)

---

## Universal Functions

These function categories exist in every template skeleton that handles their domain. All functions 
follow language-idiomatic naming (see individual SKELETON_*.md for naming patterns).

### Database Functions

**Used by:** Any template with database operations (web backends, CLI with data persistence, etc.)

These functions handle all database operations. All database access flows through this module.

#### init_db()
- **Purpose:** Initialize database connection and create schema if needed
- **Parameters:** config object with database path
- **Returns:** database connection object
- **Notes:** Called once at application startup

#### create_table(connection, table_name, schema)
- **Purpose:** Create a new table with specified schema
- **Parameters:** connection, table name, column definitions
- **Returns:** success boolean or raises exception

#### insert_record(connection, table_name, data)
- **Purpose:** Insert a single record into table
- **Parameters:** connection, table name, record data as object/dict
- **Returns:** inserted record id or full record

#### query_all(connection, table_name)
- **Purpose:** Fetch all records from a table
- **Parameters:** connection, table name
- **Returns:** list of records as objects/dicts

#### query_by_id(connection, table_name, record_id)
- **Purpose:** Fetch a single record by id
- **Parameters:** connection, table name, primary key value
- **Returns:** single record or null if not found

#### update_record(connection, table_name, record_id, data)
- **Purpose:** Update an existing record
- **Parameters:** connection, table name, record id, updated data
- **Returns:** updated record or success boolean

#### delete_record(connection, table_name, record_id)
- **Purpose:** Delete a record by id
- **Parameters:** connection, table name, record id
- **Returns:** success boolean or number of rows deleted

#### close_connection(connection)
- **Purpose:** Clean up database connection (optional—language dependent)
- **Parameters:** connection object
- **Returns:** None

---

### File I/O Functions

**Used by:** Any template that reads or writes files (most templates)

These functions handle all file operations. All file access flows through this module.

#### read_file(file_path)
- **Purpose:** Read entire file contents as string
- **Parameters:** file path
- **Returns:** file contents

#### write_file(file_path, content)
- **Purpose:** Write string content to file
- **Parameters:** file path, content string
- **Returns:** success boolean or file path

#### read_csv(file_path)
- **Purpose:** Read CSV file and return as list of records
- **Parameters:** file path
- **Returns:** list of records (each row as object/dict with header keys)

#### write_csv(file_path, records, headers)
- **Purpose:** Write list of records to CSV file
- **Parameters:** file path, records list, header names
- **Returns:** success boolean or file path

#### read_json(file_path)
- **Purpose:** Read JSON file and return as parsed object
- **Parameters:** file path
- **Returns:** parsed object (dict, list, or scalar)

#### write_json(file_path, data)
- **Purpose:** Write object to JSON file
- **Parameters:** file path, data object
- **Returns:** success boolean or file path

#### read_jsonl(file_path)
- **Purpose:** Read newline-delimited JSON file and return as list
- **Parameters:** file path
- **Returns:** list of parsed JSON objects (one per line)

#### write_jsonl(file_path, records)
- **Purpose:** Write list of objects to JSONL file (one JSON object per line)
- **Parameters:** file path, records list
- **Returns:** success boolean or file path

#### read_markdown(file_path)
- **Purpose:** Read markdown file as string
- **Parameters:** file path
- **Returns:** file contents

#### write_markdown(file_path, content)
- **Purpose:** Write markdown-formatted content to file
- **Parameters:** file path, markdown string or structured data formatted as markdown
- **Returns:** success boolean or file path

#### list_files(directory_path, pattern)
- **Purpose:** List files in directory, optionally filtered by pattern
- **Parameters:** directory path, optional glob pattern
- **Returns:** list of file paths

#### file_exists(file_path)
- **Purpose:** Check if file exists
- **Parameters:** file path
- **Returns:** boolean

#### delete_file(file_path)
- **Purpose:** Delete a file
- **Parameters:** file path
- **Returns:** success boolean

---

### API/Route Handler Functions

**Used by:** Web framework templates (FastAPI, Express, etc.)

These are route handler patterns, not individual functions. Each handler processes a request and 
returns a response (JSON or HTML).

#### GET /
- **Purpose:** Serve home page (rendered template)
- **Returns:** HTML response

#### GET /api/items
- **Purpose:** List all records from database
- **Returns:** JSON array of records

#### POST /api/items
- **Purpose:** Create a new record
- **Parameters:** request body with record data
- **Returns:** JSON response with created record and id

#### GET /api/items/{id}
- **Purpose:** Fetch a single record by id
- **Returns:** JSON record object or 404 error

#### PUT /api/items/{id}
- **Purpose:** Update an existing record
- **Parameters:** request body with updated fields
- **Returns:** JSON response with updated record

#### DELETE /api/items/{id}
- **Purpose:** Delete a record
- **Returns:** JSON confirmation or 404 error

---

### Logging Functions

**Used by:** All templates

Logging wraps the language's standard logging with a consistent format. All modules log via 
these functions.

#### log_info(source_function, message)
- **Purpose:** Log informational message (standard verbosity)
- **Parameters:** source function identifier, message string
- **Returns:** None
- **Format:** `{timestamp} | {source_function} | {message}`

#### log_debug(source_function, message)
- **Purpose:** Log structured/detailed message (high verbosity)
- **Parameters:** source function identifier, message string
- **Returns:** None
- **Format:** (same as log_info)

#### log_error(source_function, message, exception)
- **Purpose:** Log error message
- **Parameters:** source function identifier, message string, optional exception object
- **Returns:** None
- **Format:** (same as log_info, includes exception details if provided)

---

## Configuration Structure

Every template includes a `config.yaml` file at root with this structure:

```yaml
logging:
  level: DEBUG              # INFO (all), DEBUG (structured), ERROR (errors only)
  format: "{timestamp} | {source_function} | {message}"
  output_file: ./logs/app.log

database:
  path: ./data/database.db

api:
  host: 127.0.0.1
  port: 8000

outputs:
  path: ./outputs
```

**Configuration sections:**
- **logging:** Controls verbosity and output destination
- **database:** SQLite database file path (used by database module)
- **api:** Host and port (used by web framework templates only)
- **outputs:** Directory for file I/O write operations

---

## Logging Format

All logs follow a consistent ISO 8601 timestamp format:

```
2026-08-25T14:32:15.123456 | module.function_name | log message
```

**Components:**
- **Timestamp:** ISO 8601 format with microseconds
- **Source function:** Module name and function name, language-idiomatic format
- **Message:** Log message text

**Logging levels:**
- **INFO:** Standard operation logs (default visibility)
- **DEBUG:** Detailed structured logs (high verbosity)
- **ERROR:** Error messages only (low verbosity)

---

## Skeleton File Conventions

### Code Skeleton Files

Code skeleton files (in api/, db/, files/ folders, or language equivalents) are NOT implementations. 
Each provides:

- Module docstring explaining the file's role and how to use it
- Import block with common dependencies (some pre-imported, others commented)
- Function stubs with docstrings, type signatures, and inline comments explaining what each 
  function should do
- No implementation code — stubs only

The candidate fills in implementations during the session based on the interview prompt.

### Placeholder Files

Files like `plan/scratch.md`, `plan/plan.md`, `memory/MEMORY.md` ship as empty files with a 
single comment line explaining their purpose. These are populated during the session.

### config.yaml and Output Directories

Unlike code skeleton files, `config.yaml` contains actual configuration values (not stubs). It 
gets copied as part of the template and is used at runtime when code runs in a session folder.

The `outputs/` and `logs/` directories are created empty and populated at runtime by the 
application.

---

## Language-Specific Implementation

Function naming, import patterns, error handling, and type signatures vary by language. 

See individual SKELETON_*.md files for language-specific implementation details:
- docs/SKELETON_python_fastapi.md — Python/FastAPI conventions and skeleton patterns
- docs/SKELETON_typescript_express.md — TypeScript/Express conventions and skeleton patterns

To create a new skeleton type, see docs/TEMPLATE_SKELETON_target.md.

---

## Adding New Templates

When adding a new template type:

1. Check this document for which function categories apply to your template
2. Implement only the categories relevant to your template's purpose
3. Follow language idioms for naming, error handling, and structure
4. Include config.yaml with all applicable sections
5. Create all universal folders (memory/, plan/, inputs/, outputs/, logs/, tests/)
6. Create a SKELETON_*.md file documenting your specific implementation
7. Reference STRUCTURE_skeleton.md in your implementation docs
