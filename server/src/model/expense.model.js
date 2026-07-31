import { pool } from '../config/db.config.js';

export const ExpenseModel = {
  // Updated: Now accepts optional month and year
  getAllExpenses: async (userId, month, year) => {
    let query = 'SELECT * FROM expenses WHERE user_id = $1';
    let params = [userId];

    if (month && year) {
      query += ' AND EXTRACT(MONTH FROM date)::int = $2 AND EXTRACT(YEAR FROM date)::int = $3';
      params.push(month, year);
    }

    query += ' ORDER BY date DESC';
    const result = await pool.query(query, params);
    return result.rows;
  },

  createExpense: async (description, amount, category, userId) => {
    const result = await pool.query(
      'INSERT INTO expenses (description, amount, category, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [description, amount, category, userId]
    );
    return result.rows[0];
  },

  // Updated: Filter AI data by month so insights are highly relevant
  getDataForAI: async (userId, month, year) => {
    let query = 'SELECT description, amount, category, date FROM expenses WHERE user_id = $1';
    let params = [userId];

    if (month && year) {
      query += ' AND EXTRACT(MONTH FROM date)::int = $2 AND EXTRACT(YEAR FROM date)::int = $3';
      params.push(month, year);
    }

    const result = await pool.query(query, params);
    return result.rows;
  }
};