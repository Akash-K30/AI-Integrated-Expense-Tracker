import "./DashboardAnalytics.css";

import MonthlyChart from "../Charts/MonthlyChart";
import CategoryChart from "../Charts/CategoryChart";
import AIInsights from "../AIInsights/AIInsights";

export default function DashboardAnalytics({

    month

}) {

    return (

        <section className="dashboard-analytics">

            <MonthlyChart

                month={month}

            />

            <CategoryChart

                month={month}

            />

            <AIInsights

                month={month}

            />

        </section>

    );

}