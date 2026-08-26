/**
 * Express application entry point.
 *
 * This module sets up the web server, loads configuration, initializes logging,
 * and defines route handlers. All business logic should live in this module.
 *
 * Stub functions are provided for:
 * - loadConfig() — load config.yaml
 * - GET / — render home page
 * - CRUD operations on /api/items (GET all, POST, GET one, PUT, DELETE)
 *
 * No implementation code. Fill in the stubs based on the interview prompt.
 */

import express, { Express, Request, Response } from 'express';
import fs from 'fs';
import yaml from 'yaml';
import * as db_module from '../db/database';
import * as scheduling from '../utils/scheduling';

/**
 * Configuration object type.
 */
interface Config {
  logging: {
    level: string;
    format: string;
    output_file: string;
  };
  database: {
    path: string;
  };
  api: {
    host: string;
    port: number;
  };
  outputs: {
    path: string;
  };
}

/**
 * Load and return config.yaml as an object.
 *
 * @returns {Config} Configuration object with keys for logging, database, api, outputs
 * @throws {FileNotFoundError} if config.yaml not found
 */
function loadConfig(): Config {
  const content = fs.readFileSync('config.yaml', 'utf-8');
  return yaml.parse(content) as Config;
}

/**
 * Log an informational message.
 *
 * Format: {timestamp} | {source_function} | {message}
 *
 * @param sourceFunction - Name of the calling function
 * @param message - Log message
 */
function logInfo(sourceFunction: string, message: string): void {
  /**
   * TODO: Implement logging with the standard format.
   * Use the config.logging.level and config.logging.output_file.
   * Write to file if level is set appropriately.
   */
}

/**
 * Log a debug message (high verbosity).
 *
 * @param sourceFunction - Name of the calling function
 * @param message - Log message
 */
function logDebug(sourceFunction: string, message: string): void {
  /**
   * TODO: Implement debug logging.
   * Only output if config.logging.level is DEBUG.
   */
}

/**
 * Log an error message.
 *
 * @param sourceFunction - Name of the calling function
 * @param message - Log message
 * @param exception - Optional exception object
 */
function logError(sourceFunction: string, message: string, exception?: Error): void {
  /**
   * TODO: Implement error logging.
   * Include exception details if provided.
   */
}

// Initialize Express app
const app: Express = express();

// Middleware
app.use(express.json());

// Load configuration
let config: Config;
let database: any;

async function initializeApp() {
  try {
    config = loadConfig();
  } catch (error) {
    console.error('Failed to load config.yaml:', error);
    process.exit(1);
  }

  try {
    database = await db_module.initDb(config.database.path);
    db_module.createTable(
      database,
      'inspections',
      'id INTEGER PRIMARY KEY AUTOINCREMENT, address TEXT NOT NULL, inspection_date TEXT NOT NULL, confirmation_id TEXT NOT NULL UNIQUE, created_at TEXT NOT NULL'
    );
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    process.exit(1);
  }
}

app.get('/', (req: Request, res: Response): void => {
  res.send('<h1>Inspection Scheduling API</h1><p>Use /api/inspections to manage inspections.</p>');
});

interface InspectionRequest {
  address?: string;
  inspection_type?: string;
}

interface InspectionResponse {
  status: string;
  confirmationId?: string;
  scheduledDate?: string;
  message: string;
}

const VALID_INSPECTION_TYPES = ['electrical', 'plumbing', 'structural'];

app.post('/api/inspections', async (req: Request, res: Response): Promise<void> => {
  const { address, inspection_type } = req.body as InspectionRequest;

  if (!address || typeof address !== 'string' || address.trim() === '') {
    res.status(400).json({
      status: 'error',
      message: 'Address is required and must be a non-empty string'
    } as InspectionResponse);
    return;
  }

  if (!inspection_type || typeof inspection_type !== 'string' || !VALID_INSPECTION_TYPES.includes(inspection_type)) {
    res.status(400).json({
      status: 'error',
      message: `Inspection type must be one of: ${VALID_INSPECTION_TYPES.join(', ')}`
    } as InspectionResponse);
    return;
  }

  try {
    const confirmationId = db_module.getNextConfirmationId(database);
    const today = new Date();
    const nextWeekday = scheduling.getNextWeekday(today);
    const scheduledDate = scheduling.formatDateToISO(nextWeekday);

    db_module.insertInspection(database, address.trim(), scheduledDate, confirmationId);

    res.status(200).json({
      status: 'success',
      confirmationId,
      scheduledDate,
      message: `Inspection Scheduled! Your inspection date is: ${scheduledDate}. Confirmation Number: ${confirmationId}`
    } as InspectionResponse);
  } catch (error) {
    console.error('Error scheduling inspection:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to schedule inspection'
    } as InspectionResponse);
  }
});

app.get('/api/inspections', async (req: Request, res: Response): Promise<void> => {
  try {
    const inspections = db_module.getAllInspections(database);
    res.status(200).json({ inspections });
  } catch (error) {
    console.error('Error fetching inspections:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch inspections'
    });
  }
});

// Start server
initializeApp().then(() => {
  const port = config.api.port || 8000;
  const host = config.api.host || '127.0.0.1';

  app.listen(port, host, (): void => {
    console.log(`Server running at http://${host}:${port}`);
  });
}).catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

export default app;
