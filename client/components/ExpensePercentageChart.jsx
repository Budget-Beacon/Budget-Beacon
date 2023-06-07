import { Pie } from "react-chartjs-2";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function ExpensePercentageChart({
  budget,
  expenses,
  chartData,
}) {
  return <>{!!chartData && <Pie data={chartData} redraw={true} />}</>;
}
