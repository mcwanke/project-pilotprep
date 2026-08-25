# Python/FastAPI Interview Template

Quick reference for this template stack.

## Stack

- **Backend:** FastAPI + Uvicorn
- **Templates:** Jinja2 served through FastAPI
- **Database:** SQLite via Python sqlite3 stdlib
- **No ORM**

## Files

- **api/main.py** — FastAPI application, route handlers
- **db/database.py** — SQLite operations
- **files/file_io.py** — File I/O (CSV, JSON, markdown, etc.)
- **templates/index.html** — Jinja2 template for home page
- **config.yaml** — Application configuration (logging, database, api, outputs)

## To Start

```bash
pip install -r requirements.txt
uvicorn api.main:app --reload --port 8000
```

Server runs at `http://127.0.0.1:8000`  
API docs at `http://127.0.0.1:8000/docs`

## Conventions

- All business logic in the backend — templates stay thin
- All database access through db/database.py — no SQL elsewhere
- All file I/O through files/file_io.py
- Type hints on all function signatures
- Docstrings on all public functions
- snake_case for all function and variable names
