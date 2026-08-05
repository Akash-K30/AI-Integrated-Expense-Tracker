import TransactionCard from "../TransactionCard/TransactionCard";
import "./TransactionList.css";

export default function TransactionList({

    transactions,

    onEdit,

    onDelete

}) {

    if (!transactions.length) {

        return (

            <div className="empty-state">

                <h2>No Transactions Found</h2>

                <p>

                    Add your first transaction to begin tracking.

                </p>

            </div>

        );

    }

    return (

        <div>

            {

                transactions.map(transaction => (

                    <TransactionCard

                        key={transaction.id}

                        transaction={transaction}

                        onEdit={onEdit}

                        onDelete={onDelete}

                    />

                ))

            }

        </div>

    );

}