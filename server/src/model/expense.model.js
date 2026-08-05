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

 createExpense: async ({ userId, amount, category, description, date, type, paymentMethod, notes }) => {
  const result = await pool.query(
    `INSERT INTO expenses(
      user_id,
      amount,
      category,
      description,
      date,
      type,
      payment_method,
      notes
    )
    VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`, 
    [
      userId,
      amount,
      category,
      description,
      date,
      type,
      paymentMethod,
      notes
    ]
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
  },

 getSummary : async (userId) => {

    const query = `
        SELECT
            COALESCE(
                SUM(
                    CASE
                        WHEN type='credit'
                        THEN amount
                        ELSE 0
                    END
                ),0
            ) AS income,

            COALESCE(
                SUM(
                    CASE
                        WHEN type='debit'
                        THEN amount
                        ELSE 0
                    END
                ),0
            ) AS expense

        FROM expenses
        WHERE user_id=$1
    `;

    const { rows } = await pool.query(query, [userId]);

    const income = Number(rows[0].income);

    const expense = Number(rows[0].expense);

    return {

        income,

        expense,

        balance: income - expense

    };

}

};