import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './src/routes/auth.routes.js';
import expenseRoutes from './src/routes/expense.routes.js';
import { authenticateToken } from './src/middleware/auth.middleware.js';
import { errorHandler } from './src/middleware/errorHandler.js';
import './src/config/db.config.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ai-integrated-expense-tracker.vercel.app/",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

// Public Auth Routes
app.use('/api/auth', authRoutes);

// Protected Expense Routes (Require valid JWT)
app.use('/api/expenses', authenticateToken, expenseRoutes);

// Global Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});