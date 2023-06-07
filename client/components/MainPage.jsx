import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import EditBudget from "./EditBudget";
import EditSalary from "./EditSalary";
import AddExpense from "./AddExpense";
import ExpensePercentageChart from "./ExpensePercentageChart";

export default function MainPage({ id }) {
  const [data, setData] = useState("");
  const [budget, setBudget] = useState(0);
  const [salary, setSalary] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [budgetId, setBudgetId] = useState(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // invoke function to fetch data
    fetchData();
  }, []);

  useEffect(() => {
    console.log("data", data);
    setBudget(data.budget);
    setSalary(data.salary);
    setExpenses(data.expenses);
    setBudgetId(data.budgetId);
  }, [data]);

  useEffect(() => {
    console.log("expenses are", expenses);
  }, [expenses]);

  // define function to fetch data
  const fetchData = async () => {
    try {
      const response = await fetch("/main", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
      const parsedData = await response.json();

      return setData(parsedData);
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    let total = 0;
    if (expenses) {
      expenses.forEach((el) => {
        total += Number(el.expense_amount);
      });
    }
    setChartData({
      labels: ["Expenses", "Budget"],
      datasets: [
        {
          label: "Budget Spent",
          data: [total, budget - total],
          backgroundColor: ["rgb(64, 81, 59)", "rgb(157, 192, 139)"],
          borderColor: ["rgb(96, 153, 102)", "rgb(96, 153, 102)"],
        },
      ],
    });
  }, [expenses]);

  return (
    <Container
      maxWidth="lrg"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          bgcolor: "#EDF1D6",
          height: "97.5vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          component="h1"
          variant="h2"
          sx={{
            textAlign: "center",
            fontFamily: "Montserrat",
          }}
        >
          Budget Beacon
        </Typography>
        <Typography component="h1" variant="h5" sx={{ m: 3 }}>
          Monthly Salary: ${salary}
        </Typography>
        <Typography component="h1" variant="h5" sx={{ m: 3 }}>
          Monthly Budget: ${budget}
        </Typography>
        <Box
          sx={{
            bgcolor: "#EDF1D6",
            height: "97.5vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <ExpensePercentageChart
            budget={budget}
            expenses={expenses}
            chartData={chartData}
          />
        </Box>
        <AddExpense id={budgetId} setExpenses={setExpenses} />
        <EditSalary id={id} setSalary={setSalary} />
        <EditBudget id={id} setBudget={setBudget} />
      </Box>
    </Container>
  );
}
