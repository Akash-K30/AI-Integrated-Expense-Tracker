import "./TransactionCard.css";

const formatCurrency = (amount) => {

    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR"
    }).format(Number(amount));

};

const formatDate = (date) => {

    return new Date(date).toLocaleDateString("en-IN", {

        day: "numeric",

        month: "short",

        year: "numeric"

    });

};

export default function TransactionCard({

    transaction,

    onEdit,

    onDelete

}) {

    const isCredit = transaction.type === "credit";

    return (

        <div className={`transaction-card ${isCredit ? "credit" : "debit"}`}>

            <div className="transaction-top">

                <div>

                    <h3>{transaction.description}</h3>

                    <span className="category">

                        {transaction.category}

                    </span>

                </div>

                <div className="amount">

                    {isCredit ? "+" : "-"}

                    {formatCurrency(transaction.amount)}

                </div>

            </div>

            <div className="transaction-middle">

                <span>

                    💳 {transaction.payment_method}

                </span>

                <span>

                    📅 {formatDate(transaction.date)}

                </span>

            </div>

            {transaction.notes && (

                <div className="notes">

                    📝 {transaction.notes}

                </div>

            )}

            <div className="actions">

                <button

                    className="edit-btn"

                    onClick={() => onEdit(transaction)}

                >

                    ✏ Edit

                </button>

                <button

                    className="delete-btn"

                    onClick={() => onDelete(transaction.id)}

                >

                    🗑 Delete

                </button>

            </div>

        </div>

    );

}