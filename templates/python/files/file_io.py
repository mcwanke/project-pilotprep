"""
File I/O operations module.

All file access flows through this module. No file operations should appear
anywhere else in the application.

Supported formats: CSV, JSON, JSONL, Markdown, plain text

Stub functions are provided for:
- read_file() / write_file() — plain text
- read_csv() / write_csv() — CSV
- read_json() / write_json() — JSON
- read_jsonl() / write_jsonl() — newline-delimited JSON
- read_markdown() / write_markdown() — markdown
- list_files() — list files by pattern
- file_exists() — check if file exists
- delete_file() — delete a file

Output paths are resolved relative to outputs/ folder from config.yaml.

No implementation code. Fill in the stubs based on the interview prompt.
"""

import csv
import json
import os
import glob
from pathlib import Path
from datetime import datetime


def read_file(file_path: str) -> str:
    """
    Read entire file contents as string.
    
    Args:
        file_path: path to file to read
    
    Returns:
        file contents as string
    
    Raises:
        FileNotFoundError: if file does not exist
        PermissionError: if no read permission
    """
    pass


def write_file(file_path: str, content: str) -> str:
    """
    Write string content to file.
    
    Args:
        file_path: path to file to write
        content: string content to write
    
    Returns:
        file_path on success
    
    Raises:
        PermissionError: if no write permission
    """
    pass


def read_csv(file_path: str) -> list:
    """
    Read CSV file and return as list of records.
    
    Args:
        file_path: path to CSV file
    
    Returns:
        list of records (each row as dict with header keys)
    
    Raises:
        FileNotFoundError: if file does not exist
        ValueError: if CSV is malformed
    """
    pass


def write_csv(file_path: str, records: list, headers: list) -> str:
    """
    Write list of records to CSV file.
    
    Args:
        file_path: path to output CSV file
        records: list of dicts (one per row)
        headers: list of column names
    
    Returns:
        file_path on success
    
    Raises:
        PermissionError: if no write permission
    """
    pass


def read_json(file_path: str) -> dict:
    """
    Read JSON file and return as parsed object.
    
    Args:
        file_path: path to JSON file
    
    Returns:
        parsed JSON as dict, list, or scalar
    
    Raises:
        FileNotFoundError: if file does not exist
        json.JSONDecodeError: if JSON is malformed
    """
    pass


def write_json(file_path: str, data: dict) -> str:
    """
    Write object to JSON file.
    
    Args:
        file_path: path to output JSON file
        data: object to serialize (dict, list, etc.)
    
    Returns:
        file_path on success
    
    Raises:
        PermissionError: if no write permission
        TypeError: if data is not JSON-serializable
    """
    pass


def read_jsonl(file_path: str) -> list:
    """
    Read newline-delimited JSON file and return as list.
    
    Args:
        file_path: path to JSONL file
    
    Returns:
        list of parsed JSON objects (one per line)
    
    Raises:
        FileNotFoundError: if file does not exist
        json.JSONDecodeError: if any line is malformed JSON
    """
    pass


def write_jsonl(file_path: str, records: list) -> str:
    """
    Write list of objects to JSONL file (one JSON object per line).
    
    Args:
        file_path: path to output JSONL file
        records: list of objects to write
    
    Returns:
        file_path on success
    
    Raises:
        PermissionError: if no write permission
        TypeError: if any record is not JSON-serializable
    """
    pass


def read_markdown(file_path: str) -> str:
    """
    Read markdown file as string.
    
    Args:
        file_path: path to markdown file
    
    Returns:
        file contents as string
    
    Raises:
        FileNotFoundError: if file does not exist
        PermissionError: if no read permission
    """
    pass


def write_markdown(file_path: str, content: str) -> str:
    """
    Write markdown-formatted content to file.
    
    Args:
        file_path: path to output markdown file
        content: markdown string or structured data formatted as markdown
    
    Returns:
        file_path on success
    
    Raises:
        PermissionError: if no write permission
    """
    pass


def list_files(directory_path: str, pattern: str = None) -> list:
    """
    List files in directory, optionally filtered by pattern.
    
    Args:
        directory_path: path to directory
        pattern: optional glob pattern (e.g., '*.csv'), None for all files
    
    Returns:
        list of file paths (relative to directory_path)
    
    Raises:
        FileNotFoundError: if directory does not exist
    """
    pass


def file_exists(file_path: str) -> bool:
    """
    Check if file exists.
    
    Args:
        file_path: path to file
    
    Returns:
        True if file exists, False otherwise
    """
    pass


def delete_file(file_path: str) -> bool:
    """
    Delete a file.
    
    Args:
        file_path: path to file to delete
    
    Returns:
        True if successful
    
    Raises:
        FileNotFoundError: if file does not exist
        PermissionError: if no delete permission
    """
    pass
