import { Button, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";

export default function AddExpense({ id, setExpenses }) {
  const [input, setInput] = useState("");

  const handleSubmit = (event) => {
    // event.preventDefault()
    const newObj = { expense_amount: input };
    setExpenses((prevState) => [...prevState, newObj]);
    postExpense(input);
  };

  function postExpense(input) {
    fetch("/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ expenses: input, budget_id: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Expense has been added", data);
      })
      .catch((error) => {
        console.log("error in postExpense", error);
      });
  }

  return (
    <Box
      sx={{ display: "flex", marginY: "1rem", marginX: "1rem", gap: "1rem" }}
    >
      <TextField
        sx={{ width: "150px", input: { color: "#66bb6a" } }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <span style={{ color: "#66bb6a" }}>$</span>
            </InputAdornment>
          ),
        }}
        variant="outlined"
        color="success"
        focused
        label="Expense"
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <Button
        onClick={() => handleSubmit()}
        sx={{ width: "170px" }}
        variant="contained"
        color="success"
      >
        Add Expense
      </Button>
    </Box>
  );
}
