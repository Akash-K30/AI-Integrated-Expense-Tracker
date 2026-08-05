import { useEffect, useState } from "react";
import "./TransactionForm.css";

const initialState = {
    description: "",
    amount: "",
    category: "Food",
    date: new Date().toISOString().split("T")[0],
    type: "debit",
    payment_method: "Cash",
    notes: ""
};

const categories = [
    "Food",
    "Transport",
    "Shopping",
    "Bills",
    "Entertainment",
    "Salary",
    "Health",
    "Education",
    "Other"
];

const paymentMethods = [
    "Cash",
    "UPI",
    "Card",
    "Bank Transfer"
];

export default function TransactionForm({
    onSubmit,
    editingTransaction,
    onCancel
}) {

    const [formData, setFormData] = useState(initialState);

    useEffect(() => {

        if (editingTransaction) {

            setFormData({
                ...editingTransaction,
                amount: Number(editingTransaction.amount),
                date: editingTransaction.date?.split("T")[0]
            });

        } else {

            setFormData(initialState);

        }

    }, [editingTransaction]);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!formData.description.trim()) {

            alert("Description required");
            return;

        }

        if (!formData.amount || Number(formData.amount) <= 0) {

            alert("Enter valid amount");
            return;

        }

        onSubmit({
            ...formData,
            amount: Number(formData.amount)
        });

        if (!editingTransaction) {

            setFormData(initialState);

        }

    };

    return (

        <form className="transaction-form" onSubmit={handleSubmit}>

            <h2>

                {editingTransaction ? "Edit Transaction" : "Add Transaction"}

            </h2>

            <div className="form-group">

                <label>Description</label>

                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />

            </div>

            <div className="row">

                <div className="form-group">

                    <label>Amount</label>

                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                    />

                </div>

                <div className="form-group">

                    <label>Type</label>

                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                    >

                        <option value="debit">Debit</option>

                        <option value="credit">Credit</option>

                    </select>

                </div>

            </div>

            <div className="row">

                <div className="form-group">

                    <label>Category</label>

                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    >

                        {categories.map(category => (

                            <option
                                key={category}
                                value={category}
                            >
                                {category}
                            </option>

                        ))}

                    </select>

                </div>

                <div className="form-group">

                    <label>Payment</label>

                    <select
                        name="payment_method"
                        value={formData.payment_method}
                        onChange={handleChange}
                    >

                        {paymentMethods.map(method => (

                            <option
                                key={method}
                                value={method}
                            >
                                {method}
                            </option>

                        ))}

                    </select>

                </div>

            </div>

            <div className="form-group">

                <label>Date</label>

                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                />

            </div>

            <div className="form-group">

                <label>Notes</label>

                <textarea
                    rows="4"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                />

            </div>

            <div className="buttons">

                <button
                    className="save-btn"
                    type="submit"
                >

                    {editingTransaction ? "Update" : "Add"}

                </button>

                {editingTransaction && (

                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={onCancel}
                    >

                        Cancel

                    </button>

                )}

            </div>

        </form>

    );

}