/**
 * SQLite database operations module.
 *
 * ALL database access flows through this module. No raw SQL queries elsewhere.
 *
 * Uses sql.js (pure JavaScript SQLite, no compilation needed).
 * Database is persisted to disk.
 */

import initSqlJs, { Database as SqlJsDatabase } from 'sql.js';
import fs from 'fs';
import path from 'path';

let SQL: any;
let dbPath: string;

export async function initDb(filePath: string): Promise<SqlJsDatabase> {
  if (!SQL) {
    SQL = await initSqlJs();
  }

  dbPath = filePath;
  const dir = path.dirname(dbPath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  let db: SqlJsDatabase;
  if (fs.existsSync(dbPath)) {
    const buffer = fs.readFileSync(dbPath);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }

  return db;
}

function saveDb(db: SqlJsDatabase): void {
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(dbPath, buffer);
}

export function createTable(db: SqlJsDatabase, tableName: string, schema: string): void {
  const sql = `CREATE TABLE IF NOT EXISTS ${tableName} (${schema})`;
  db.run(sql);
  saveDb(db);
}

export function insertRecord(db: SqlJsDatabase, tableName: string, data: Record<string, any>): any {
  const keys = Object.keys(data);
  const placeholders = keys.map(() => '?').join(', ');
  const values = keys.map(k => data[k]);
  const sql = `INSERT INTO ${tableName} (${keys.join(', ')}) VALUES (${placeholders})`;
  db.run(sql, values);
  saveDb(db);
  return data;
}

export function queryAll(db: SqlJsDatabase, tableName: string): any[] {
  const sql = `SELECT * FROM ${tableName}`;
  const result = db.exec(sql);
  if (result.length === 0) return [];

  const columns = result[0].columns;
  const values = result[0].values;
  return values.map((row: any) => {
    const obj: Record<string, any> = {};
    columns.forEach((col: any, idx: any) => {
      obj[col] = row[idx];
    });
    return obj;
  });
}

export function queryById(db: SqlJsDatabase, tableName: string, recordId: number): any | null {
  const sql = `SELECT * FROM ${tableName} WHERE id = ?`;
  const result = db.exec(sql, [recordId]);
  if (result.length === 0 || result[0].values.length === 0) return null;

  const columns = result[0].columns;
  const row = result[0].values[0];
  const obj: Record<string, any> = {};
  columns.forEach((col: any, idx: any) => {
    obj[col] = row[idx];
  });
  return obj;
}

export function updateRecord(
  db: SqlJsDatabase,
  tableName: string,
  recordId: number,
  data: Record<string, any>
): any {
  const keys = Object.keys(data);
  const setClauses = keys.map(k => `${k} = ?`).join(', ');
  const values = [...keys.map(k => data[k]), recordId];
  const sql = `UPDATE ${tableName} SET ${setClauses} WHERE id = ?`;
  db.run(sql, values);
  saveDb(db);
  return data;
}

export function deleteRecord(db: SqlJsDatabase, tableName: string, recordId: number): number {
  const sql = `DELETE FROM ${tableName} WHERE id = ?`;
  db.run(sql, [recordId]);
  saveDb(db);
  return 1;
}

export function closeConnection(db: SqlJsDatabase): void {
  db.close();
}

export function getNextConfirmationId(db: SqlJsDatabase): string {
  const sql = `SELECT MAX(CAST(SUBSTR(confirmation_id, 5) AS INTEGER)) as maxId FROM inspections`;
  const result = db.exec(sql);

  if (result.length === 0 || result[0].values.length === 0) {
    return 'INS-0001';
  }

  const maxId = result[0].values[0][0] as number | null;
  const nextNum = (maxId || 0) + 1;
  return `INS-${String(nextNum).padStart(4, '0')}`;
}

export function insertInspection(
  db: SqlJsDatabase,
  address: string,
  inspection_date: string,
  confirmation_id: string
): any {
  const created_at = new Date().toISOString();
  return insertRecord(db, 'inspections', { address, inspection_date, confirmation_id, created_at });
}

export function getAllInspections(db: SqlJsDatabase): any[] {
  const sql = `SELECT * FROM inspections ORDER BY inspection_date ASC`;
  const result = db.exec(sql);
  if (result.length === 0) return [];

  const columns = result[0].columns;
  const values = result[0].values;
  return values.map((row: any) => {
    const obj: Record<string, any> = {};
    columns.forEach((col: any, idx: any) => {
      obj[col] = row[idx];
    });
    return obj;
  });
}
