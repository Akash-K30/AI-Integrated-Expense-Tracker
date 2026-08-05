import "./Header.css";

export default function Header({

    selectedMonth,

    setSelectedMonth,

    logout

}) {

    return (

        <header className="header">

            <div>

                <h1>

                    AI Expense Tracker

                </h1>

                <p>

                    Track income, expenses and AI insights

                </p>

            </div>

            <div className="header-actions">

                <input

                    type="month"

                    value={selectedMonth}

                    onChange={(e)=>setSelectedMonth(e.target.value)}

                />

                <button

                    onClick={logout}

                >

                    Logout

                </button>

            </div>

        </header>

    );

}