# SKELETON_python_fastapi.md — Python FastAPI Skeleton Implementation

## Overview

This document describes the skeleton implementation for Python using FastAPI. It is specific to 
this language/framework combination and should be referenced when:

- Creating a new session using the Python template
- Understanding what files exist in the Python template and what each contains
- Implementing the function stubs during an interview session

For universal skeleton structure and function categories that apply to ALL templates, 
see docs/STRUCTURE_skeleton.md.

---

## Template Structure

```
templates/python/
├── CLAUDE.md                       — interview session context
├── README.md                       — quick reference for Python template
├── requirements.txt                — Python dependencies (pip freeze format)
├── config.yaml                     — universal application config
├── memory/
│   └── MEMORY.md                   — placeholder, auto-written at END SESSION
├── plan/
│   ├── scratch.md                  — empty, for quick notes during session
│   ├── plan.md                     — empty, for candidate approach before prompting
│   └── WORKORDER.md                — empty, Claude Code generates this
├── inputs/                         — empty, for input data files (CSV, JSON, etc.)
├── outputs/                        — empty, where file_io.py writes results (created at runtime)
├── logs/                           — empty, created at runtime by logging
├── tests/                          — empty, for test files (optional)
├── data/                           — empty, for sample input files
├── api/
│   └── main.py                     — FastAPI application entry point
├── db/
│   └── database.py                 — SQLite database operations
├── files/
│   └── file_io.py                  — file I/O operations (CSV, JSON, markdown, etc.)
└── templates/
    └── index.html                  — Jinja2 template skeleton
```

---

## Skeleton Files

### Configuration Files

#### requirements.txt
Python package dependencies (pip format). Includes:
- `fastapi==0.104.1` — web framework
- `uvicorn==0.24.0` — ASGI server
- All other common dependencies pre-added, commented where not yet needed

Uncomment or add dependencies as needed during the session.

#### config.yaml
Universal application configuration (see STRUCTURE_skeleton.md). The Python skeleton reads 
this file at startup and makes config available to all modules.

---

## Code Skeleton Files

### api/main.py

**Purpose:** FastAPI application entry point. Sets up the web server, loads configuration, 
initializes logging, and defines route handlers.

**Key components:**
- FastAPI application instance
- Configuration loading from config.yaml
- Logging initialization
- Route handler function stubs for:
  - `GET /` — render home page (return rendered Jinja2 template)
  - `GET /api/items` — list all records
  - `POST /api/items` — create new record
  - `GET /api/items/{id}` — get single record
  - `PUT /api/items/{id}` — update record
  - `DELETE /api/items/{id}` — delete record
- Jinja2 template configuration

**Imports included:**
- `from fastapi import FastAPI, Request`
- `from fastapi.responses import HTMLResponse`
- `from fastapi.staticfiles import StaticFiles` (commented)
- `import yaml`
- `from jinja2 import Environment, FileSystemLoader`
- Standard library: `json`, `logging`

**Function stubs:**
- `load_config()` — load and return config.yaml as dict
- Route handlers (one stub per route above)
- Helper functions for database/file operations (documented in docstring)

**No implementation code** — candidate fills in during session.

---

### db/database.py

**Purpose:** SQLite database operations module. ALL database access flows through this module.

**Key components:**
- SQLite connection initialization
- Schema creation if needed
- Query functions (see STRUCTURE_skeleton.md for full list):
  - `init_db(config)` — create connection and initialize schema
  - `create_table(connection, table_name, schema)` — create table
  - `insert_record(connection, table_name, data)` — add record
  - `query_all(connection, table_name)` — get all records
  - `query_by_id(connection, table_name, record_id)` — get one record
  - `update_record(connection, table_name, record_id, data)` — modify record
  - `delete_record(connection, table_name, record_id)` — remove record
- Connection context manager for safe resource handling

**Imports included:**
- `import sqlite3`
- `from contextlib import contextmanager` (for connection context manager)
- Standard library: `json`, `datetime`

**Function stubs:**
- One stub per database function listed above
- Each includes docstring with parameters, return type, and behavior description
- Comments explaining typical error cases

**Naming convention:** `snake_case` (e.g., `query_by_id`, `insert_record`)

**No implementation code** — candidate fills in during session.

---

### files/file_io.py

**Purpose:** File I/O operations module. ALL file access flows through this module.

**Supported formats:** CSV, JSON, JSONL, Markdown, plain text

**Key components:**
- File reading/writing functions for each format (see STRUCTURE_skeleton.md):
  - `read_file(file_path)` — read plain text
  - `write_file(file_path, content)` — write plain text
  - `read_csv(file_path)` — read CSV as list of dicts
  - `write_csv(file_path, records, headers)` — write list of dicts to CSV
  - `read_json(file_path)` — read JSON file
  - `write_json(file_path, data)` — write object as JSON
  - `read_jsonl(file_path)` — read newline-delimited JSON
  - `write_jsonl(file_path, records)` — write list as JSONL
  - `read_markdown(file_path)` — read markdown file
  - `write_markdown(file_path, content)` — write markdown file
  - `list_files(directory_path, pattern)` — list files with optional pattern
  - `file_exists(file_path)` — check if file exists
  - `delete_file(file_path)` — delete a file
- Output path resolution from config.yaml

**Imports included:**
- `import csv`
- `import json`
- `import os`
- `import glob`
- Standard library: `pathlib`, `datetime`

**Function stubs:**
- One stub per file I/O function listed above
- Each includes docstring with parameters, return type, and behavior
- Output functions resolve paths relative to `outputs/` folder from config

**Naming convention:** `snake_case` (e.g., `read_csv`, `write_json`)

**No implementation code** — candidate fills in during session.

---

### templates/index.html

**Purpose:** Jinja2 template skeleton for the home page (served by FastAPI).

**Key components:**
- Basic HTML5 boilerplate
- Jinja2 template syntax (loops, conditionals, variable interpolation)
- Sample form pattern (POST endpoint)
- Sample data display pattern (loop over items)
- CSS minimal styling (functional, not pretty)

**Includes:**
- `<form>` stub for creating new items (POST to /api/items)
- List/table stub for displaying items (loops over items variable)
- Comments explaining how to extend

**No business logic** — all logic in api/main.py. Template only handles:
- Variable display (`{{ variable }}`)
- Loops over collections (`{% for item in items %}`)
- Conditionals (`{% if condition %}`)

---

## Function Naming Conventions

All Python functions use `snake_case`:
- Function names: `query_by_id()`, `log_info()`, `read_csv()`
- Variables: `user_name`, `record_id`, `config_dict`
- Classes: `UserModel` (PascalCase)
- Constants: `MAX_RETRIES`, `DATABASE_PATH` (UPPER_SNAKE_CASE)

---

## Error Handling Conventions

Python skeleton uses exception-based error handling:
- Functions raise `Exception` or specific exception types on error
- API route handlers catch exceptions and return appropriate HTTP status codes:
  - 400 Bad Request — invalid input
  - 404 Not Found — record not found
  - 500 Internal Server Error — unexpected error
- Database functions raise exceptions if queries fail
- File I/O functions raise exceptions if file not found or permission denied
- Exceptions are logged via `log_error()` before being re-raised or handled

---

## Logging Implementation

All logging goes through the logging module in the skeleton.

**Logging functions:**

```python
def log_info(source_function: str, message: str) -> None:
    """Log info-level message with standard format.
    
    Format: {timestamp} | {source_function} | {message}
    """

def log_debug(source_function: str, message: str) -> None:
    """Log debug-level message with standard format.
    
    Only shown if config.yaml logging.level is DEBUG.
    """

def log_error(source_function: str, message: str, exception: Exception = None) -> None:
    """Log error-level message with standard format.
    
    Includes exception details if exception object provided.
    """
```

**Implementation pattern:**
- Use `logging.basicConfig()` to set up logging to file (from config.yaml)
- Implement the three functions to wrap standard logging
- Each function formats message with ISO 8601 timestamp and source function name
- Log level (INFO, DEBUG, ERROR) controls what gets written

---

## Configuration Loading

The skeleton loads `config.yaml` at startup via a `load_config()` function.

**Config sections used:**
- `logging.level` — controls logging verbosity (INFO, DEBUG, ERROR)
- `logging.output_file` — file path for log output
- `database.path` — SQLite database file path
- `api.host` and `api.port` — where to run the FastAPI server
- `outputs.path` — directory for file I/O operations

**Access pattern:**
```python
config = load_config()
db_path = config['database']['path']
log_level = config['logging']['level']
output_dir = config['outputs']['path']
```

All three skeleton modules (api/main.py, db/database.py, files/file_io.py) receive or load config 
and use it rather than hardcoding values.

---

## Running the Python Template

Once implemented:

```bash
# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn api.main:app --host 127.0.0.1 --port 8000 --reload
```

Server runs at `http://127.0.0.1:8000` with interactive API docs at `/docs`.

---

## Testing (Optional)

The template includes an empty `tests/` folder. If adding tests during the session:

- Test file naming: `test_*.py` (pytest convention)
- Test functions: `test_*()` naming convention
- Mock database for unit tests (don't use real SQLite)
- Run tests: `pytest tests/`

---

## Quick Start for Interview Sessions

When creating a new Python interview session:

1. Read this document and docs/STRUCTURE_skeleton.md
2. Review the inline comments in each skeleton file
3. Implement function stubs based on the interview prompt
4. Use `snake_case` for all function and variable names
5. Raise exceptions on errors (don't return error codes)
6. Log via `log_info()`, `log_debug()`, `log_error()` functions
7. Load and use config.yaml for all configuration
8. Access database only through db/database.py
9. Access files only through files/file_io.py
10. Keep templates/index.html logic-light (all logic in api/main.py)

See the template's CLAUDE.md for the interview workflow.
