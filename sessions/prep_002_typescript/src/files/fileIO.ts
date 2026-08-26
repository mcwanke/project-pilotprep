/**
 * File I/O operations module.
 *
 * ALL file access flows through this module. No raw file operations elsewhere.
 *
 * Supported formats: plain text, CSV, JSON, JSONL, Markdown
 * All file I/O is synchronous using fs (not fs/promises) for simplicity.
 *
 * Stub functions are provided for reading and writing each format.
 *
 * No implementation code. Fill in the stubs based on the interview prompt.
 */

import fs from 'fs';
import path from 'path';

// import csv from 'csv-parse';  // uncomment if needed for CSV parsing

/**
 * Configuration object (passed from main server).
 * Used to determine the outputs directory.
 */
interface Config {
  outputs: {
    path: string;
  };
}

let config: Config = { outputs: { path: './outputs' } };

/**
 * Set the config for this module (called from server.ts).
 *
 * @param cfg - Configuration object with outputs path
 */
export function setConfig(cfg: Config): void {
  config = cfg;
}

/**
 * Read entire file contents as string.
 *
 * @param filePath - File path (absolute or relative)
 * @returns {string} File contents
 * @throws {Error} if file not found or permission denied
 */
export function readFile(filePath: string): string {
  /**
   * TODO: Read file synchronously and return contents as string.
   * Use fs.readFileSync with UTF-8 encoding.
   * Throw error if file not found.
   */
  throw new Error('readFile() not implemented');
}

/**
 * Write string content to file.
 *
 * @param filePath - File path (absolute or relative, or resolved to outputs/)
 * @param content - Content string
 * @returns {boolean | string} Success boolean or file path
 * @throws {Error} if write fails
 */
export function writeFile(filePath: string, content: string): boolean | string {
  /**
   * TODO: Write content to file synchronously.
   * Resolve path relative to outputs/ if not absolute.
   * Create parent directories if needed.
   * Use fs.writeFileSync.
   * Return success boolean or the file path.
   */
  throw new Error('writeFile() not implemented');
}

/**
 * Read CSV file and return as list of records.
 *
 * @param filePath - File path
 * @returns {any[]} List of records (each row as object with header keys)
 * @throws {Error} if file not found or parse fails
 */
export function readCsv(filePath: string): any[] {
  /**
   * TODO: Read CSV file and parse into array of objects.
   * First line should be headers.
   * Each subsequent line becomes an object with header keys.
   * Can use simple string parsing or a CSV library.
   */
  throw new Error('readCsv() not implemented');
}

/**
 * Write list of records to CSV file.
 *
 * @param filePath - File path (resolved to outputs/)
 * @param records - Array of record objects
 * @param headers - Array of header names (keys to extract from records)
 * @returns {boolean | string} Success boolean or file path
 * @throws {Error} if write fails
 */
export function writeCsv(filePath: string, records: any[], headers: string[]): boolean | string {
  /**
   * TODO: Write records to CSV file with headers.
   * First line should be comma-separated headers.
   * Each record becomes a CSV row with values in header order.
   * Resolve path relative to outputs/.
   * Use fs.writeFileSync.
   */
  throw new Error('writeCsv() not implemented');
}

/**
 * Read JSON file and return as parsed object.
 *
 * @param filePath - File path
 * @returns {any} Parsed object (dict, list, or scalar)
 * @throws {Error} if file not found or JSON parse fails
 */
export function readJson(filePath: string): any {
  /**
   * TODO: Read JSON file and parse it.
   * Use fs.readFileSync and JSON.parse.
   * Throw error if JSON is invalid.
   */
  throw new Error('readJson() not implemented');
}

/**
 * Write object to JSON file.
 *
 * @param filePath - File path (resolved to outputs/)
 * @param data - Object to serialize
 * @returns {boolean | string} Success boolean or file path
 * @throws {Error} if write fails
 */
export function writeJson(filePath: string, data: any): boolean | string {
  /**
   * TODO: Serialize object to JSON and write to file.
   * Use JSON.stringify with indentation for readability.
   * Resolve path relative to outputs/.
   * Use fs.writeFileSync.
   */
  throw new Error('writeJson() not implemented');
}

/**
 * Read newline-delimited JSON file and return as list.
 *
 * @param filePath - File path
 * @returns {any[]} List of parsed JSON objects (one per line)
 * @throws {Error} if file not found or parse fails
 */
export function readJsonl(filePath: string): any[] {
  /**
   * TODO: Read file line by line and parse each line as JSON.
   * Each line should be a valid JSON object.
   * Return array of parsed objects.
   * Skip empty lines.
   */
  throw new Error('readJsonl() not implemented');
}

/**
 * Write list of objects to JSONL file.
 *
 * @param filePath - File path (resolved to outputs/)
 * @param records - Array of objects
 * @returns {boolean | string} Success boolean or file path
 * @throws {Error} if write fails
 */
export function writeJsonl(filePath: string, records: any[]): boolean | string {
  /**
   * TODO: Write array of objects to JSONL file.
   * Each record becomes one JSON-serialized line.
   * Lines are separated by newlines.
   * Resolve path relative to outputs/.
   * Use fs.writeFileSync.
   */
  throw new Error('writeJsonl() not implemented');
}

/**
 * Read markdown file as string.
 *
 * @param filePath - File path
 * @returns {string} File contents
 * @throws {Error} if file not found
 */
export function readMarkdown(filePath: string): string {
  /**
   * TODO: Read markdown file as plain text string.
   * Same as readFile() but specifically for .md files.
   */
  throw new Error('readMarkdown() not implemented');
}

/**
 * Write markdown-formatted content to file.
 *
 * @param filePath - File path (resolved to outputs/)
 * @param content - Markdown string or structured data formatted as markdown
 * @returns {boolean | string} Success boolean or file path
 * @throws {Error} if write fails
 */
export function writeMarkdown(filePath: string, content: string): boolean | string {
  /**
   * TODO: Write markdown-formatted content to file.
   * Same as writeFile() but specifically for .md files.
   * Ensure file ends with .md extension.
   */
  throw new Error('writeMarkdown() not implemented');
}

/**
 * List files in directory, optionally filtered by pattern.
 *
 * @param directoryPath - Directory path
 * @param pattern - Optional glob pattern for filtering (e.g., "*.csv")
 * @returns {string[]} List of file paths
 * @throws {Error} if directory not found
 */
export function listFiles(directoryPath: string, pattern?: string): string[] {
  /**
   * TODO: List files in directory.
   * If pattern provided, filter results by that pattern.
   * Pattern might be something like "*.csv" or "*.json".
   * Return array of file paths or just file names.
   */
  throw new Error('listFiles() not implemented');
}

/**
 * Check if file exists.
 *
 * @param filePath - File path
 * @returns {boolean} True if file exists, false otherwise
 */
export function fileExists(filePath: string): boolean {
  /**
   * TODO: Check if file exists.
   * Use fs.existsSync or fs.statSync to check.
   * Return boolean.
   */
  throw new Error('fileExists() not implemented');
}

/**
 * Delete a file.
 *
 * @param filePath - File path
 * @returns {boolean} Success boolean
 * @throws {Error} if file not found or deletion fails
 */
export function deleteFile(filePath: string): boolean {
  /**
   * TODO: Delete file.
   * Use fs.unlinkSync.
   * Throw error if file not found.
   * Return success boolean.
   */
  throw new Error('deleteFile() not implemented');
}
