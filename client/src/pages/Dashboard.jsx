import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import ReactMarkdown from "react-markdown";
import { FaGithub, FaLinkedin } from "react-icons/fa";



export default function Dashboard() {
  const { token, logout, user } = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);
  const [insights, setInsights] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const getCurrentMonthYear = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  };
  
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonthYear());
  
  // Form State
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");

useEffect(() => {
  fetchExpenses();
}, [selectedMonth]);

const fetchExpenses = async () => {
    const [year, month] = selectedMonth.split('-');

    
    
    const res = await fetch(`${API_URL}/api/expenses?month=${month}&year=${year}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.ok) {
      const data = await res.json();
      setExpenses(data);
    } else if (res.status === 401 || res.status === 403) {
      logout(); 
    }
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    await fetch(`${API_URL}/api/expenses`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ description, amount, category })
    });
    
    setDescription("");
    setAmount("");
    fetchExpenses();
  };

const getInsights = async () => {
    setLoading(true);
    const [year, month] = selectedMonth.split('-');
    try {
      const res = await fetch(`${API_URL}/api/expenses?month=${month}&year=${year}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setInsights(data.insight);
    } catch (error) {
      setInsights("Error connecting to AI.");
    }
    setLoading(false);
  };

  const totalSpent = expenses.reduce(
  (sum, expense) => sum + Number(expense.amount || 0),
  0
);

  return (
    <div style={{ background: "var(--paper)", color: "var(--ink)" }} className="min-h-screen font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500;600&display=swap');
        :root {
          --paper: #FAF8F3;
          --ink: #1E2A32;
          --ink-soft: #5B6670;
          --teal: #0F6657;
          --gold: #C9982F;
          --rust: #B3402A;
          --line: #E5E0D3;
        }
        .font-display { font-family: 'Fraunces', serif; }
        .font-sans { font-family: 'Inter', system-ui, sans-serif; }
        .font-mono { font-family: 'IBM Plex Mono', monospace; }

        .ticket {
          position: relative;
          background: var(--ink);
          color: var(--paper);
          border-radius: 20px 20px 0 0;
          padding: 28px 28px 34px;
        }
        .ticket::after {
          content: '';
          position: absolute;
          left: 0; right: 0; bottom: -1px; height: 16px;
          background: radial-gradient(circle at 8px 0, transparent 8px, var(--paper) 8.6px) repeat-x;
          background-size: 16px 16px;
        }
        .focus-ring:focus-visible {
          outline: 2px solid var(--teal);
          outline-offset: 2px;
        }
        @media (prefers-reduced-motion: no-preference) {
          .row-enter { animation: rowIn 0.25s ease-out; }
        }
        @keyframes rowIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-10">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-medium sm:text-3xl" style={{ color: "var(--ink)" }}>
              Expense Tracker
            </h1>
          </div>
          <button
            onClick={logout}
            className="focus-ring rounded-full border px-4 py-2 text-sm font-medium transition-colors"
            style={{ borderColor: "var(--line)", color: "var(--ink-soft)" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--rust)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--line)")}
          >
            Log out
          </button>
        </div>
        

        {/* Signature element: ticket-stub running total */}
       {/* Month Filter Bar */}
<div
  className="mb-6 flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
  style={{ border: "1px solid var(--line)" }}
>
  <div className="flex items-center gap-4">
    <label
      className="text-sm font-semibold"
      style={{ color: "var(--ink)" }}
    >
      View Month:
    </label>

    <input
      type="month"
      value={selectedMonth}
      onChange={(e) => setSelectedMonth(e.target.value)}
      className="focus-ring rounded-lg px-3 py-2 text-sm"
      style={{ border: "1px solid var(--line)" }}
    />
  </div>

  <div className="font-mono text-lg font-semibold">
    Monthly Total:
    <span
      className="ml-2"
      style={{ color: "var(--rust)" }}
    >
      ${totalSpent.toFixed(2)}
    </span>
  </div>
</div>


        <div className="grid gap-6 md:grid-cols-2">
          {/* Left column */}
          <div className="space-y-6">
            {/* Add expense */}
            <div className="rounded-2xl bg-white p-6 shadow-sm" style={{ border: "1px solid var(--line)" }}>
              <h3 className="font-display mb-4 text-lg font-medium">Add an expense</h3>
              <form onSubmit={handleAddExpense} className="space-y-3">
                <input
                  type="text"
                  placeholder="What was it for?"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="focus-ring w-full rounded-lg px-3 py-2.5 text-sm"
                  style={{ border: "1px solid var(--line)" }}
                />
                <div className="flex gap-3">
                  <div className="relative w-1/2">
                    <span className="font-mono pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: "var(--ink-soft)" }}>
                      $
                    </span>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      required
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="focus-ring font-mono w-full rounded-lg py-2.5 pl-6 pr-3 text-sm"
                      style={{ border: "1px solid var(--line)" }}
                    />
                  </div>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="focus-ring w-1/2 rounded-lg bg-white px-3 py-2.5 text-sm"
                    style={{ border: "1px solid var(--line)" }}
                  >
                    <option>Food</option>
                    <option>Transport</option>
                    <option>Entertainment</option>
                    <option>Utilities</option>
                    <option>Other</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="focus-ring w-full rounded-lg py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
                  style={{ background: "var(--teal)" }}
                >
                  Save expense
                </button>
              </form>
            </div>

            {/* AI insights */}
            <div className="rounded-2xl p-6 shadow-sm" style={{ background: "#0F665708", border: "1px solid #0F665722" }}>
              <h3 className="font-display mb-1 text-lg font-medium" style={{ color: "var(--teal)" }}>
                Ask your AI assistant
              </h3>
              <p className="mb-4 text-sm" style={{ color: "var(--ink-soft)" }}>
                Get a quick read on where your money's going.
              </p>
              <button
                onClick={getInsights}
                disabled={loading}
                className="focus-ring w-full rounded-lg py-2.5 text-sm font-medium text-white transition-opacity disabled:opacity-60"
                style={{ background: "var(--teal)" }}
              >
                {loading ? "Analyzing…" : "Get financial advice"}
              </button>
              {insights && (
                <div className="font-sans mt-4 rounded-lg bg-white p-4 text-sm leading-relaxed shadow-inner" style={{ border: "1px solid var(--line)" }}>
                  <ReactMarkdown>{insights}</ReactMarkdown>
                </div>
              )}
            </div>
          </div>

          {/* Right column: history */}
          <div className="rounded-2xl bg-white p-6 shadow-sm" style={{ border: "1px solid var(--line)" }}>
            <h3 className="font-display mb-4 text-lg font-medium">Recent history</h3>
            <div className="max-h-[480px] space-y-2 overflow-y-auto pr-1">
              {expenses.length === 0 ? (
                <div className="rounded-lg py-10 text-center" style={{ border: "1px dashed var(--line)" }}>
                  <p className="text-sm" style={{ color: "var(--ink-soft)" }}>
                    No expenses yet. Add your first one on the left.
                  </p>
                </div>
              ) : (
                expenses.map(exp => {
                  const categoryStyles = {
                    Food: { bg: "#0F665714", fg: "#0F6657", dot: "#0F6657" },
                    Transport: { bg: "#1E2A3214", fg: "#1E2A32", dot: "#1E2A32" },
                    Entertainment: { bg: "#C9982F1F", fg: "#8A6A1E", dot: "#C9982F" },
                    Utilities: { bg: "#B3402A14", fg: "#B3402A", dot: "#B3402A" },
                    Other: { bg: "#6B655814", fg: "#6B6558", dot: "#6B6558" },
                  };
                  const style = categoryStyles[exp.category] || categoryStyles.Other;
                  return (
                    <div
                      key={exp.id}
                      className="row-enter flex items-center justify-between gap-3 rounded-lg px-3 py-3"
                      style={{ borderBottom: "1px solid var(--line)" }}
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium" style={{ color: "var(--ink)" }}>
                          {exp.description}
                        </p>
                        <span
                          className="mt-1 inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium"
                          style={{ background: style.bg, color: style.fg }}
                        >
                          <span className="h-1.5 w-1.5 rounded-full" style={{ background: style.dot }} />
                          {exp.category}
                        </span>
                      </div>
                      <span className="font-mono shrink-0 text-sm font-semibold" style={{ color: "var(--rust)" }}>
                        −${Number(exp.amount).toFixed(2)}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
        {/* Footer */}

<footer
  className="mt-10 border-t pt-6"
  style={{ borderColor: "var(--line)" }}
>
  <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">

    {/* Left */}
    <div>
      <p
        className="text-sm font-medium"
        style={{ color: "var(--ink)" }}
      >
        © {new Date().getFullYear()} Expense Tracker
      </p>

      <p
        className="mt-1 text-xs"
        style={{ color: "var(--ink-soft)" }}
      >
        Built{" "}
        {" "}
        by <span className="font-semibold">Akash</span>
      </p>
    </div>

    {/* Right */}
    <div className="flex items-center gap-5">

      <a
        href="https://www.linkedin.com/in/akash-kaliraman00"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 transition-all hover:opacity-80 hover:-translate-y-0.5"
        style={{ color: "var(--teal)" }}
      >
        <FaLinkedin size={18} />
        <span className="text-sm font-medium">LinkedIn</span>
      </a>

      <a
        href="https://github.com/Akash-K30"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 transition-all hover:opacity-80 hover:-translate-y-0.5"
        style={{ color: "var(--teal)" }}
      >
        <FaGithub size={18} />
        <span className="text-sm font-medium">GitHub</span>
      </a>

    </div>
  </div>
</footer>
      </div>
    </div>
  );
}