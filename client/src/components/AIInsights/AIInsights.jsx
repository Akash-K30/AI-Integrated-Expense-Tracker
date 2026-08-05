import { useContext, useState } from "react";

import ReactMarkdown from "react-markdown";

import "./AIInsights.css";

import { AuthContext } from "../../context/AuthContext";

export default function AIInsights({ month }) {

    const { token } = useContext(AuthContext);

    const API_URL =
        import.meta.env.VITE_API_URL || "http://localhost:5000";

    const [loading, setLoading] = useState(false);

    const [insights, setInsights] = useState("");

    const getInsights = async () => {

        setLoading(true);

        try {

            const [year, monthNo] = month.split("-");

            const res = await fetch(

                `${API_URL}/api/expenses/insights?month=${monthNo}&year=${year}`,

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            const data = await res.json();

            setInsights(data.insight);

        }

        catch {

            setInsights(

                "Unable to connect to AI service."

            );

        }

        setLoading(false);

    };

    const copyInsight = async () => {

        if (!insights) return;

        await navigator.clipboard.writeText(insights);

        alert("Copied!");

    };

    return (

        <div className="ai-card">

            <div className="ai-header">

                <h2>

                    AI Financial Advisor

                </h2>

                <p>

                    Analyze your spending using AI.

                </p>

            </div>

            <button

                className="generate-btn"

                disabled={loading}

                onClick={getInsights}

            >

                {

                    loading

                        ? "Analyzing..."

                        : "Generate Insights"

                }

            </button>

            {

                insights && (

                    <>

                        <div className="markdown">

                            <ReactMarkdown>

                                {insights}

                            </ReactMarkdown>

                        </div>

                        <div className="buttons">

                            <button

                                onClick={copyInsight}

                            >

                                Copy

                            </button>

                            <button

                                onClick={getInsights}

                            >

                                Regenerate

                            </button>

                        </div>

                    </>

                )

            }

        </div>

    );

}