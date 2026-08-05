import {

    ResponsiveContainer,

    BarChart,

    Bar,

    CartesianGrid,

    Tooltip,

    XAxis,

    YAxis

} from "recharts";

import { useEffect,useState } from "react";

import { getMonthlyData } from "../../services/chartService";

import "./Charts.css";

export default function MonthlyChart({

    month

}){

    const [data,setData]=useState([]);

    const [loading,setLoading]=useState(true);

    useEffect(()=>{

        loadChart();

    },[month]);

    const loadChart=async()=>{

        try{

            setLoading(true);

            const response=

                await getMonthlyData(month);

            setData(

    response.map(item=>({

        ...item,

        day:new Date(item.day)

            .toLocaleDateString(

                "en-IN",

                {

                    day:"numeric",

                    month:"short"

                }

            )

    }))

);

        }

        catch(err){

            console.log(err);

        }

        finally{

            setLoading(false);

        }

    };

    if(loading){

        return(

            <div className="chart-card">

                Loading...

            </div>

        );

    }

    return(

        <div className="chart-card">

            <h2 className="chart-title">

                Daily Spending

            </h2>

            <div className="chart-wrapper">

                <ResponsiveContainer>

                    <BarChart data={data}>

                        <CartesianGrid

                            strokeDasharray="3 3"

                        />

                        <XAxis

                            dataKey="day"

                        />

                        <YAxis/>

                        <Tooltip/>

                        <Bar

                            dataKey="total"

                            radius={[6,6,0,0]}

                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}