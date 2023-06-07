import { Pie } from "react-chartjs-2";
import React from "react";
import Box from "@mui/material/Box";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function ExpensePercentageChart({ budget, expenses, salary }) {
  const [chartData, setChartData] = React.useState({
    labels: ["Expenses", "Budget", "Savings"],
    datasets: [
      {
        label: "Budget Spent",
        data: [0, budget, salary - budget],
        backgroundColor: ["rgb(64, 81, 59)", "rgb(157, 192, 139)", "green"],
        borderColor: ["rgb(96, 153, 102)", "rgb(96, 153, 102)", "green"],
      },
    ],
  });
  React.useEffect(() => {
    let total = 0;
    if (expenses) {
      expenses.forEach((el) => {
        total += Number(el.expense_amount);
      });
    }
    setChartData({
      labels: ["Expenses", "Budget Remaining", "Savings"],
      datasets: [
        {
          label: "Amount",
          data: [total, budget - total, salary - budget],
          backgroundColor: [
            "rgb(64, 81, 59)",
            "rgb(157, 192, 139)",
            "rgb(75, 122, 59)",
          ],
          borderColor: [
            "rgb(96, 153, 102)",
            "rgb(96, 153, 102)",
            "rgb(75, 122, 59)",
          ],
        },
      ],
    });
  }, [expenses]);
  return (
    <Box
      sx={{
        bgcolor: "rgb(0,0,0)",
        display: "flex",
        flexDirection: "column",
        alignSelf: "center",
        width: "20rem",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!!chartData && <Pie data={chartData} redraw={true} />}
    </Box>
  );
}
