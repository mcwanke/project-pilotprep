"""
FastAPI application entry point.

Sets up the web server, loads configuration, initializes database,
and defines route handlers.
"""

import logging
from pathlib import Path
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse, HTMLResponse
from jinja2 import Environment, FileSystemLoader
import yaml
import sqlite3

from db.database import init_db, insert_permit, insert_attempt

CONFIG = None
DB_CONNECTION = None
ALLOWED_PERMIT_TYPES = {'building', 'electrical', 'plumbing'}


def load_config() -> dict:
    """Load and return config.yaml as a dictionary."""
    with open('config.yaml', 'r') as f:
        return yaml.safe_load(f)


def setup_logging(config: dict) -> None:
    """Configure application logging."""
    log_path = config['logging']['output_file']
    log_dir = Path(log_path).parent
    log_dir.mkdir(parents=True, exist_ok=True)
    logging.basicConfig(
        level=config['logging']['level'],
        format=config['logging']['format'],
        style='{',
        handlers=[
            logging.FileHandler(log_path),
            logging.StreamHandler()
        ]
    )


# Initialize FastAPI app
app = FastAPI()


@app.on_event("startup")
async def startup_event() -> None:
    """Initialize database and configuration on startup."""
    global CONFIG, DB_CONNECTION
    CONFIG = load_config()
    setup_logging(CONFIG)
    DB_CONNECTION = init_db(CONFIG)


@app.on_event("shutdown")
async def shutdown_event() -> None:
    """Close database connection on shutdown."""
    global DB_CONNECTION
    if DB_CONNECTION:
        DB_CONNECTION.close()


@app.get("/", response_class=HTMLResponse)
async def read_root() -> str:
    """Render and return the home page."""
    env = Environment(loader=FileSystemLoader('templates'))
    template = env.get_template('index.html')
    return template.render()


@app.post("/api/application/")
async def submit_application(request: Request) -> JSONResponse:
    """
    Submit a permit application.

    Expected JSON body:
        {
            "applicant_name": "string",
            "address": "string",
            "permit_type": "string (building|electrical|plumbing)"
        }

    Returns:
        200: {"status": "success", "case_num": "CASE-XXXX", "message": "..."}
        400: {"status": "error", "message": "..."}
        500: {"status": "error", "message": "..."}
    """
    try:
        body = await request.json()
    except Exception:
        insert_attempt(DB_CONNECTION, 400, "Invalid JSON")
        return JSONResponse(
            status_code=400,
            content={"status": "error", "message": "Invalid JSON"}
        )

    applicant_name = body.get('applicant_name', '').strip()
    address = body.get('address', '').strip()
    permit_type = body.get('permit_type', '').strip().lower()

    if not applicant_name or not address or not permit_type:
        insert_attempt(DB_CONNECTION, 400, "Missing required fields")
        return JSONResponse(
            status_code=400,
            content={"status": "error", "message": "All fields are required"}
        )

    if permit_type not in ALLOWED_PERMIT_TYPES:
        allowed = ', '.join(sorted(ALLOWED_PERMIT_TYPES))
        error_msg = f"Invalid permit type. Allowed: {allowed}"
        insert_attempt(DB_CONNECTION, 400, error_msg)
        return JSONResponse(
            status_code=400,
            content={"status": "error", "message": error_msg}
        )

    try:
        permit_id = insert_permit(DB_CONNECTION, applicant_name, address, permit_type)
        case_num = f"CASE-{permit_id:04d}"
        message = f"Application accepted. Your case number is {case_num}"
        insert_attempt(DB_CONNECTION, 200, message, permit_id)
        return JSONResponse(
            status_code=200,
            content={"status": "success", "case_num": case_num, "message": message}
        )
    except sqlite3.Error as e:
        error_msg = f"Database error: {str(e)}"
        insert_attempt(DB_CONNECTION, 500, error_msg)
        return JSONResponse(
            status_code=500,
            content={"status": "error", "message": "Server error"}
        )
