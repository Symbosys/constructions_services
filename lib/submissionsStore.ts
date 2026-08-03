import fs from 'fs';
import path from 'path';

export interface FormattedContactMessage {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  domain?: string | null;
  message: string;
  createdAt: string;
  status?: string;
}

const BACKUP_FILE_PATH = path.join(process.cwd(), 'data', 'submissions_backup.json');

// Global Node.js store to guarantee memory persistence within process
const globalForSubmissions = globalThis as unknown as {
  inMemorySubmissions: FormattedContactMessage[] | undefined;
};

if (!globalForSubmissions.inMemorySubmissions) {
  globalForSubmissions.inMemorySubmissions = [];
}

/**
 * Reads persistent submissions backup from disk
 */
export function readSubmissionsFromFile(): FormattedContactMessage[] {
  try {
    if (!fs.existsSync(BACKUP_FILE_PATH)) {
      return [];
    }
    const raw = fs.readFileSync(BACKUP_FILE_PATH, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn('Error reading submissions backup file:', err);
    return [];
  }
}

/**
 * Writes persistent submissions backup to disk
 */
export function writeSubmissionsToFile(submissions: FormattedContactMessage[]): void {
  try {
    const dir = path.dirname(BACKUP_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(BACKUP_FILE_PATH, JSON.stringify(submissions, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Error writing submissions backup file:', err);
  }
}

/**
 * Adds a new submission to persistent disk backup + memory store
 */
export function addSubmissionToStore(inquiry: FormattedContactMessage): FormattedContactMessage[] {
  const fromFile = readSubmissionsFromFile();
  const fromMem = globalForSubmissions.inMemorySubmissions || [];

  const map = new Map<number, FormattedContactMessage>();
  for (const item of fromFile) map.set(item.id, item);
  for (const item of fromMem) map.set(item.id, item);
  map.set(inquiry.id, inquiry);

  const updatedList = Array.from(map.values()).sort((a, b) => b.id - a.id);
  globalForSubmissions.inMemorySubmissions = updatedList;
  writeSubmissionsToFile(updatedList);
  return updatedList;
}

/**
 * Retrieves all stored submissions from disk backup + memory store
 */
export function getSubmissionsFromStore(): FormattedContactMessage[] {
  const fromFile = readSubmissionsFromFile();
  const fromMem = globalForSubmissions.inMemorySubmissions || [];

  const map = new Map<number, FormattedContactMessage>();
  for (const item of fromFile) map.set(item.id, item);
  for (const item of fromMem) map.set(item.id, item);

  const combined = Array.from(map.values()).sort((a, b) => b.id - a.id);
  globalForSubmissions.inMemorySubmissions = combined;
  return combined;
}

/**
 * Removes a submission by ID from persistent disk backup + memory store
 */
export function deleteSubmissionFromStore(id: number): FormattedContactMessage[] {
  const current = getSubmissionsFromStore();
  const updated = current.filter((m) => m.id !== id);
  globalForSubmissions.inMemorySubmissions = updated;
  writeSubmissionsToFile(updated);
  return updated;
}
