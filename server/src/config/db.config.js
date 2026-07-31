import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    // Required for Supabase external connections to bypass strict local certificate checks
    rejectUnauthorized: false 
  }
});

// Test connection on startup
pool.on('connect', () => {
  console.log('Connected to Supabase PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Unexpected Supabase pool error:', err);
  process.exit(-1);
});