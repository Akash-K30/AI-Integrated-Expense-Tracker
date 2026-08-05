import axios from "axios";

const API = axios.create({
     baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/"
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

export const getTransactions = async (month) => {

    const [year, monthNo] = month.split("-");

    const response = await API.get(

        `/expenses?month=${monthNo}&year=${year}`

    );

    return response.data;

};

export const addTransaction = async (transaction) => {
    const response = await API.post("/api/expenses", transaction);
    return response.data;
};

export const updateTransaction = async (id, transaction) => {
    const response = await API.put(`/api/expenses/${id}`, transaction);
    return response.data;
};

export const deleteTransaction = async (id) => {
    const response = await API.delete(`/api/expenses/${id}`);
    return response.data;
};


// =======================
// Dashboard Summary
// =======================

export const getSummary = async (month) => {

    const [year, monthNo] = month.split("-");

    const response = await API.get(

        `/api/expenses/summary?month=${monthNo}&year=${year}`

    );

    return response.data;

};


// =======================
// AI Insights
// =======================

export const generateInsights = async () => {
    const response = await API.get("/api/expenses/insights");
    return response.data;
};

export default API;