import { ExpenseModel } from '../model/expense.model.js';
import { ai } from '../config/gemini.config.js';

export const expenseController = {
  getExpenses: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { month, year } = req.query; // Extract from URL

      const expenses = await ExpenseModel.getAllExpenses(userId, month, year);
      res.status(200).json(expenses);
    } catch (error) {
      next(error);
    }
  },

  // ... (keep addExpense exactly the same as before) ...
  addExpense: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { amount, category, description, date, type, paymentMethod, notes } = req.body;

      if (!description || !amount || !category) {
        return res.status(400).json({ error: 'Description, amount, and category are required.' });
      }

      if (!["credit", "debit"].includes(type)) {
        return res.status(400).json({
          message: "Invalid transaction type"
        });
      }

      const newExpense = await ExpenseModel.createExpense({

        amount,

        category,

        description,

        date,

        type,

        paymentMethod,

        notes

      });

      res.status(201).json(newExpense);
    } catch (error) {
      next(error);
    }
  },

  getAIInsights: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { month, year } = req.query; // Extract from URL

      const expenses = await ExpenseModel.getDataForAI(userId, month, year);

      if (expenses.length === 0) {
        return res.status(200).json({
          insight: "No expenses found for this month! Add some data so I can help analyze your spending."
        });
      }

      const expenseData = JSON.stringify(expenses);
      const prompt = `Act as a helpful financial advisor. Here is the user's expense data for the selected month: ${expenseData}. 
      Analyze their spending patterns by category. Provide a short summary and 3 actionable tips to optimize their budget for this specific month.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
      });

      res.status(200).json({ insight: response.text });
    } catch (error) {
      next(error);
    }
  },

 getSummary : async (req, res) => {

    try {

        const summary = await ExpenseModel.getSummary(req.user.id);

        res.status(200).json(summary);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Failed to fetch summary"
        });

    }

}

};