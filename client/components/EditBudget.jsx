import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputAdornment from "@mui/material/InputAdornment";

export default function FormDialog({ setBudget, id }) {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (event) => {
    //set budget in mainpage
    setBudget(input);
    //fetch to the backend to update budget table
    postBudget(input);
    handleClose();
  };

  function postBudget(input) {
    fetch("/budget", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ budget: input, id: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Budget has been added", data);
      })
      .catch((error) => {
        console.log("error in postBudget", error);
      });
  }

  return (
    <div style={{ margin: "1rem" }}>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit Budget
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Budget</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter your new budget.</DialogContentText>
          <TextField
            id="filled-start-adornment"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            autoFocus
            margin="dense"
            name="budget"
            label="New Budget"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleSubmit()}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
