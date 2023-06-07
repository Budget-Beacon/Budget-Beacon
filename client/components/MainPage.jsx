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
import SavingsIcon from "@mui/icons-material/Savings";

export default function MainPage({ id }) {
  const [data, setData] = useState("");
  const [budget, setBudget] = useState(0);
  const [salary, setSalary] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [budgetId, setBudgetId] = useState(null);

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

  return (
    <div>
      <Container
        maxWidth={false}
        sx={{
          // height: "100vh",
          bgcolor: "rgb(15,10,150)",
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            height: 1,
            width: 1,
            bgcolor: "rgb(25, 25, 25)",
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
              color: "rgb(250, 250, 250)",
            }}
          >
            Budget Beacon
            <SavingsIcon fontSize="large" />
          </Typography>
          <Typography
            component="h1"
            variant="h5"
            sx={{
              marginLeft: "1rem",
              marginTop: "1rem",
              color: "rgb(64, 81, 59)",
            }}
          >
            Monthly Salary: <span style={{ color: "#85bb65" }}>${salary}</span>
          </Typography>
          <EditSalary id={id} setSalary={setSalary} />
          <Typography
            component="h1"
            variant="h5"
            sx={{
              marginLeft: "1rem",
              marginTop: "1rem",
              color: "rgb(64, 81, 59)",
            }}
          >
            Monthly Budget: <span style={{ color: "#85bb65" }}>${budget}</span>
          </Typography>
          <EditBudget id={id} setBudget={setBudget} />
          <AddExpense id={budgetId} setExpenses={setExpenses} />
          <ExpensePercentageChart
            budget={budget}
            expenses={expenses}
            salary={salary}
          />
        </Box>
      </Container>
    </div>
  );
}
