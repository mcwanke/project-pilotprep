# TEMPLATE_SKELETON_target.md — Skeleton Implementation Template

## How to Use This File

This is a template for documenting skeleton implementations for specific languages and frameworks.

**To create a new skeleton implementation:**
1. Copy this file
2. Remove "TEMPLATE_" from the filename
3. Replace "target" with your implementation name (e.g., `SKELETON_python_fastapi.md`, `SKELETON_golang_cli.md`)
4. Fill in all sections with language/framework-specific details
5. Reference docs/STRUCTURE_skeleton.md for universal requirements

---

# SKELETON_[language]_[framework].md — [Language] [Framework] Skeleton Implementation

## Overview

This document describes the skeleton implementation for [Language] using [Framework/Runtime]. 
It is specific to this language/framework combination and should be referenced when:

- Creating a new session using this template
- Understanding what files exist in this template and what each contains
- Implementing the function stubs during an interview session

For universal skeleton structure and function categories that apply to ALL templates, 
see docs/STRUCTURE_skeleton.md.

---

## Template Structure

```
[template_name]/
├── CLAUDE.md                       — interview session context
├── README.md                       — quick reference
├── package.json / requirements.txt — language dependencies
├── [config files]                  — language-specific config (tsconfig.json, etc.)
├── config.yaml                     — universal application config
├── memory/
│   └── MEMORY.md
├── plan/
│   ├── scratch.md
│   ├── plan.md
│   └── WORKORDER.md
├── inputs/                         — input data files
├── outputs/                        — output data files (created at runtime)
├── logs/                           — logs (created at runtime)
├── tests/                          — test files (optional)
└── [language-specific structure below]
```

### Language-Specific Folder Structure

[Describe the actual folder structure for your language/framework]

Example for Python/FastAPI:
```
├── api/
│   └── main.py                     — FastAPI application entry point
├── db/
│   └── database.py                 — SQLite database operations
├── files/
│   └── file_io.py                  — file I/O operations
├── templates/
│   └── index.html                  — Jinja2 template skeleton
└── data/                           — empty, for sample input files
```

---

## Skeleton Files

### Configuration Files

[List and describe language/framework specific config files]

Example:
- `package.json` — Node dependencies (see Dependencies section)
- `tsconfig.json` — TypeScript configuration with strict mode enabled
- `config.yaml` — Universal application config (see STRUCTURE_skeleton.md)

### Code Skeleton Files

#### api/main.py (or equivalent)

**Purpose:** [Framework] entry point. Sets up the web server and route handlers.

**Key components:**
- Import statements for framework and dependencies
- Configuration loading from config.yaml
- Logging initialization
- Route handler stubs (see STRUCTURE_skeleton.md for route names)
- [Framework]-specific patterns (e.g., Flask app factory, FastAPI dependency injection)

**What's included:**
- Module docstring
- Imports (some pre-imported, others commented)
- Function stubs for API routes (GET /, GET /api/items, POST /api/items, etc.)
- Comments explaining what each route should do
- No implementation code

#### db/database.py (or equivalent)

**Purpose:** SQLite database operations module. All database access flows through this module.

**Key components:**
- Database connection initialization
- Query functions (see STRUCTURE_skeleton.md for function names)
- Connection cleanup/context management
- [Language]-specific database library patterns

**What's included:**
- Module docstring explaining the module's role
- Imports (sqlite3 or language equivalent, with common utilities)
- Function stubs for all database operations defined in STRUCTURE_skeleton.md
- Comments explaining each function
- No implementation code

#### files/file_io.py (or equivalent)

**Purpose:** File I/O operations module. All file access flows through this module.

**Supported formats:** CSV, JSON, JSONL, Markdown, plain text (see STRUCTURE_skeleton.md)

**Key components:**
- File reading/writing functions for each supported format
- File listing and existence checking
- [Language]-specific file handling patterns
- Output path resolution from config.yaml

**What's included:**
- Module docstring
- Imports (relevant file libraries — csv, json, etc.)
- Function stubs for all file I/O operations in STRUCTURE_skeleton.md
- Comments explaining each function
- No implementation code

#### templates/index.html (or equivalent)

**Purpose:** [Framework] template skeleton. Base HTML template for serving the home page.

**Key components:**
- Basic HTML structure
- [Framework]-specific template syntax (e.g., Jinja2 for Python, etc.)
- Sample form or data display pattern
- Links to static assets (if applicable)

**What's included:**
- Basic HTML boilerplate
- One sample template pattern (form, list display, or data table)
- Comments explaining how to extend it
- No business logic in templates (all logic in backend)

---

## Function Naming Conventions

[Describe language-idiomatic naming for this language]

Example for Python:
- Function names: `snake_case`
- Variables: `snake_case`
- Classes: `PascalCase`
- Constants: `UPPER_SNAKE_CASE`
- Database module: `query_by_id`, `insert_record`, `log_info`
- File I/O module: `read_csv`, `write_json`, `list_files`

Example for TypeScript:
- Function names: `camelCase`
- Variables: `camelCase`
- Classes: `PascalCase`
- Constants: `UPPER_SNAKE_CASE`
- Database module: `queryById`, `insertRecord`, `logInfo`
- File I/O module: `readCsv`, `writeJson`, `listFiles`

---

## Error Handling Conventions

[Describe how errors should be handled in this language/framework]

Example:
- [Language] exceptions/errors are caught and logged via `log_error()`
- API route handlers return appropriate HTTP status codes (400, 404, 500, etc.)
- Functions raise exceptions on error rather than returning error codes
- Database operations include connection error handling
- File operations handle missing files, permission errors, etc.

---

## Logging Implementation

All logging goes through the logging functions defined in STRUCTURE_skeleton.md.

**Logging module pattern:**

[Describe how to implement the logging functions in your language]

Example for Python:
```python
import logging
from datetime import datetime

def log_info(source_function: str, message: str) -> None:
    """Log info-level message with standard format."""
    timestamp = datetime.now().isoformat()
    print(f"{timestamp} | {source_function} | {message}")

def log_debug(source_function: str, message: str) -> None:
    """Log debug-level message with standard format."""
    # Similar implementation, controlled by config.yaml logging.level
    pass

def log_error(source_function: str, message: str, exception: Exception = None) -> None:
    """Log error-level message with standard format."""
    # Similar implementation, includes exception details if provided
    pass
```

---

## Configuration Loading

The application loads `config.yaml` at startup and makes configuration available to all modules.

**Config sections used by this template:**

[List which config sections apply to this template]

Example:
- `logging` — controls log level and output
- `database` — path to SQLite database
- `api` — host and port for the web server
- `outputs` — directory for file I/O write operations

[Describe how configuration is accessed from within skeleton modules]

---

## Testing Patterns (Optional)

[If your template includes tests/, describe testing patterns here]

Example:
- Unit tests for database functions
- Integration tests for file I/O
- API route tests (if framework supports it)
- Test file naming: `test_*.py` or `*.test.ts`

---

## Dependencies

[List all dependencies and why they're needed]

### [Language] Standard Library
[List standard library modules used]

### Third-Party Dependencies

[List and version pin third-party packages]

Example for Python:
```
fastapi==0.104.1        # Web framework
uvicorn==0.24.0         # ASGI server
pydantic==2.5.0         # Data validation
```

Example for TypeScript:
```
express: ^4.18.0        # Web framework
typescript: ^5.3.0      # TypeScript compiler
better-sqlite3: ^9.0.0  # SQLite driver
```

---

## Quick Start for Interview Sessions

When you create a new session using this template:

1. Review this document and STRUCTURE_skeleton.md
2. Read the inline comments in each skeleton file to understand what each function should do
3. Follow the naming conventions described above
4. Implement functions based on the interview prompt
5. Use `config.yaml` for configuration, not hardcoded values
6. Write all logs via the logging functions
7. Write all database access through the database module
8. Write all file I/O through the file I/O module

For the interview workflow, see the template's CLAUDE.md file.
