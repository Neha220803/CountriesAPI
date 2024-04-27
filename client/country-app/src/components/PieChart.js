import React from 'react'
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function PieChart({ data }) {
    return <div style={{ width: 300 }}>
        <h4>Languages Spoken:</h4>
        <Pie data={data} />
    </div>
}

export default PieChart;