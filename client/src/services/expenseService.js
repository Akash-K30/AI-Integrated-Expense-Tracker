import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
});

// Automatically attach JWT
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});


// =======================
// Transactions
// =======================

export const getTransactions = async () => {
    const response = await API.get("/expenses");
    return response.data;
};

export const addTransaction = async (transaction) => {
    const response = await API.post("/expenses", transaction);
    return response.data;
};

export const updateTransaction = async (id, transaction) => {
    const response = await API.put(`/expenses/${id}`, transaction);
    return response.data;
};

export const deleteTransaction = async (id) => {
    const response = await API.delete(`/expenses/${id}`);
    return response.data;
};


// =======================
// Dashboard Summary
// =======================

export const getSummary = async () => {
    const response = await API.get("/expenses/summary");
    return response.data;
};


// =======================
// AI Insights
// =======================

export const generateInsights = async () => {
    const response = await API.get("/expenses/insights");
    return response.data;
};

export default API;