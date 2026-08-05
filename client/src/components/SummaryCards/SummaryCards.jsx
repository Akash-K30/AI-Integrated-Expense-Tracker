import "./SummaryCards.css";

const SummaryCards = ({ summary }) => {

    const income = Number(summary?.income || 0);

    const expense = Number(summary?.expense || 0);

    const balance = Number(summary?.balance || income - expense);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 2
        }).format(value);
    };

    return (
        <div className="summary-container">

            <div className="summary-card balance">

                <h3>Total Balance</h3>

                <h2>{formatCurrency(balance)}</h2>

            </div>

            <div className="summary-card income">

                <h3>Total Income</h3>

                <h2>{formatCurrency(income)}</h2>

            </div>

            <div className="summary-card expense">

                <h3>Total Expense</h3>

                <h2>{formatCurrency(expense)}</h2>

            </div>

        </div>
    );

};

export default SummaryCards;