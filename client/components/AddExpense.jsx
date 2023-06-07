import { Button, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";

export default function AddExpense({ id, setExpenses }) {
  const [input, setInput] = useState("");

  // useEffect(()=>{

  // })

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
    <Box sx={{ display: "flex" }}>
      <TextField
        sx={{ width: "150px" }}
        id="expense"
        label="Expense"
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <Button
        onClick={() => handleSubmit()}
        sx={{ width: "170px" }}
        variant="outlined"
      >
        Add Expense
      </Button>
    </Box>
  );
}
