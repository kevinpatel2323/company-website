/**
 * Server-only utilities for reading/writing dynamic content stored in
 * /data/*.json — these run in API routes and Server Components only.
 *
 * In local development the JSON files persist on disk. On a read-only
 * host (e.g. Vercel) you'd swap these for a database (Supabase, PlanetScale…).
 */
import fs from 'fs';
import path from 'path';

import type { BlogPost } from './blog-posts';
import type { WorkProject } from './work-projects';
import type { Position } from './careers-data';

const DATA_DIR = path.join(process.cwd(), 'data');

function readFile<T>(filename: string): T[] {
  try {
    const fp = path.join(DATA_DIR, filename);
    if (!fs.existsSync(fp)) return [];
    return JSON.parse(fs.readFileSync(fp, 'utf-8')) as T[];
  } catch {
    return [];
  }
}

function writeFile<T>(filename: string, data: T[]): void {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(path.join(DATA_DIR, filename), JSON.stringify(data, null, 2));
}

/* ── Blog ─────────────────────────────────────────────────────── */
export const getDynamicPosts    = () => readFile<BlogPost>('blog-posts.json');
export const saveDynamicPosts   = (d: BlogPost[]) => writeFile('blog-posts.json', d);

/* ── Work projects ────────────────────────────────────────────── */
export const getDynamicProjects  = () => readFile<WorkProject>('work-projects.json');
export const saveDynamicProjects = (d: WorkProject[]) => writeFile('work-projects.json', d);

/* ── Career positions ─────────────────────────────────────────── */
export const getDynamicPositions  = () => readFile<Position>('career-positions.json');
export const saveDynamicPositions = (d: Position[]) => writeFile('career-positions.json', d);
