import { useContext, useEffect, useState } from "react";

import "./Dashboard.css";

import { AuthContext } from "../context/AuthContext";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

import SummaryCards from "../components/SummaryCards/SummaryCards";
import TransactionForm from "../components/TransactionForm/TransactionForm";
import TransactionList from "../components/TransactionList/TransactionList";

import AIInsights from "../components/AIInsights/AIInsights";
import DashboardAnalytics from "../components/DashboardAnalytics/DashboardAnalytics";

import {
    getTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    getSummary
} from "../services/expenseService";

export default function Dashboard() {

    const { logout } = useContext(AuthContext);

    const getCurrentMonth = () => {

        const d = new Date();

        return `${d.getFullYear()}-${String(
            d.getMonth() + 1
        ).padStart(2, "0")}`;

    };

    const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());

    const [transactions, setTransactions] = useState([]);

    const [summary, setSummary] = useState({

        income: 0,

        expense: 0,

        balance: 0

    });

    const [editingTransaction, setEditingTransaction] = useState(null);

    const [loading, setLoading] = useState(false);

    //---------------------------------------------------

    const loadTransactions = async () => {

        try {

            setLoading(true);

            const data = await getTransactions(selectedMonth);

            setTransactions(data);

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }

    };

    //---------------------------------------------------

    const loadSummary = async () => {

        try {

            const data = await getSummary(selectedMonth);

            setSummary(data);

        } catch (err) {

            console.log(err);

        }

    };

    //---------------------------------------------------

    useEffect(() => {

        loadTransactions();

        loadSummary();

    }, [selectedMonth]);

    //---------------------------------------------------

    const handleSaveTransaction = async (data) => {

        try {

            if (editingTransaction) {

                await updateTransaction(

                    editingTransaction.id,

                    data

                );

            }

            else {

                await addTransaction(data);

            }

            setEditingTransaction(null);

            loadTransactions();

            loadSummary();

        }

        catch (err) {

            console.log(err);

        }

    };

    //---------------------------------------------------

    const handleDelete = async (id) => {

        if (!window.confirm("Delete transaction?"))

            return;

        try {

            await deleteTransaction(id);

            loadTransactions();

            loadSummary();

        }

        catch (err) {

            console.log(err);

        }

    };

    //---------------------------------------------------

    return (

        <div className="dashboard">

            <Header

                selectedMonth={selectedMonth}

                setSelectedMonth={setSelectedMonth}

                logout={logout}

            />

            <SummaryCards

                summary={summary}

            />

            <TransactionForm

                editingTransaction={editingTransaction}

                onSubmit={handleSaveTransaction}

                onCancel={() => setEditingTransaction(null)}

            />

            <div className="dashboard-grid">

                <div className="dashboard-main">

                    <div className="ledger-panel">

                        <TransactionList

                            transactions={transactions}

                            onEdit={setEditingTransaction}

                            onDelete={handleDelete}

                            loading={loading}

                        />

                    </div>

                </div>

                <aside className="dashboard-side">

                    <AIInsights

                        month={selectedMonth}

                    />

                    <DashboardAnalytics

                        month={selectedMonth}

                    />

                </aside>

            </div>

            <Footer />

        </div>

    );

}