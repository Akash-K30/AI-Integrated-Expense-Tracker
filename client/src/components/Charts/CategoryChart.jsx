import {

    ResponsiveContainer,

    PieChart,

    Pie,

    Tooltip,

    Cell,

    Legend

} from "recharts";

import { useEffect, useState } from "react";

import { getCategoryData } from "../../services/chartService";

import "./Charts.css";

const COLORS = [

    "#2563eb",

    "#16a34a",

    "#dc2626",

    "#ca8a04",

    "#9333ea",

    "#0891b2",

    "#ea580c",

    "#475569"

];

export default function CategoryChart({

    month

}) {

    const [data, setData] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadChart();

    }, [month]);

    const loadChart = async () => {

        try {

            setLoading(true);

            const response = await getCategoryData(month);

            setData(

                response.map(item => ({

                    ...item,

                    total: Number(item.total)

                }))

            );

        }

        catch (err) {

            console.log(err);

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <div className="chart-card">

                Loading...

            </div>

        );

    }

    return (

        <div className="chart-card">

            <h2 className="chart-title">

                Category Breakdown

            </h2>

            <div className="chart-wrapper">

                <ResponsiveContainer>

                    <PieChart>

                        <Pie

                            data={data}

                            dataKey="total"

                            nameKey="category"

                            outerRadius={100}

                            label

                        >

                            {

                                data.map((entry, index) => (

                                    <Cell

                                        key={index}

                                        fill={

                                            COLORS[index % COLORS.length]

                                        }

                                    />

                                ))

                            }

                        </Pie>

                        <Tooltip

                            formatter={(value) => `₹${value}`}

                        />

                        <Legend/>

                    </PieChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}