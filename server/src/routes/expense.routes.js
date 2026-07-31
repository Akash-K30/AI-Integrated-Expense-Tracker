import express from 'express';
import { expenseController } from '../controllers/expense.controller.js';

const router = express.Router();

// Define routes
router.get('/', expenseController.getExpenses);
router.post('/', expenseController.addExpense);
router.get('/insights', expenseController.getAIInsights);

export default router;