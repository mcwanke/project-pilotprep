"""
SQLite database operations module.

All database access flows through this module. No SQL should appear
anywhere else in the application.
"""

import sqlite3
from contextlib import contextmanager
from pathlib import Path


def init_db(config: dict) -> sqlite3.Connection:
    """
    Initialize database connection and create schema if needed.

    Args:
        config: configuration dictionary with database.path

    Returns:
        sqlite3.Connection object

    Raises:
        sqlite3.Error: if database connection fails
    """
    db_path = config['database']['path']
    db_dir = Path(db_path).parent
    db_dir.mkdir(parents=True, exist_ok=True)

    conn = sqlite3.connect(db_path, check_same_thread=False)
    conn.row_factory = sqlite3.Row

    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS permits (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            applicant_name TEXT NOT NULL,
            address TEXT NOT NULL,
            permit_type TEXT NOT NULL,
            case_num TEXT NOT NULL UNIQUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS permit_application_attempts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            status_code INTEGER NOT NULL,
            response_message TEXT NOT NULL,
            permit_id INTEGER,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (permit_id) REFERENCES permits(id)
        )
    ''')
    conn.commit()

    return conn


def insert_permit(connection: sqlite3.Connection, applicant_name: str, address: str, permit_type: str) -> int:
    """
    Insert a permit record and return the generated ID.

    Args:
        connection: sqlite3 connection object
        applicant_name: name of applicant
        address: address
        permit_type: type of permit (building, electrical, plumbing)

    Returns:
        inserted permit id
    """
    case_num = ""
    cursor = connection.cursor()
    cursor.execute('''
        INSERT INTO permits (applicant_name, address, permit_type, case_num)
        VALUES (?, ?, ?, ?)
    ''', (applicant_name, address, permit_type, case_num))
    permit_id = cursor.lastrowid

    case_num = f"CASE-{permit_id:04d}"
    cursor.execute('UPDATE permits SET case_num = ? WHERE id = ?', (case_num, permit_id))
    connection.commit()

    return permit_id


def insert_attempt(connection: sqlite3.Connection, status_code: int, response_message: str, permit_id: int = None) -> int:
    """
    Insert an attempt record (success or failure).

    Args:
        connection: sqlite3 connection object
        status_code: HTTP status code
        response_message: message/error text
        permit_id: associated permit id (None for failures)

    Returns:
        inserted attempt id
    """
    cursor = connection.cursor()
    cursor.execute('''
        INSERT INTO permit_application_attempts (status_code, response_message, permit_id)
        VALUES (?, ?, ?)
    ''', (status_code, response_message, permit_id))
    connection.commit()
    return cursor.lastrowid


@contextmanager
def get_db_connection(config: dict):
    """
    Context manager for database connections.

    Usage:
        with get_db_connection(config) as conn:
            data = query_all(conn, 'items')

    Yields:
        sqlite3.Connection object
    """
    conn = sqlite3.connect(config['database']['path'], check_same_thread=False)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
    finally:
        conn.close()
