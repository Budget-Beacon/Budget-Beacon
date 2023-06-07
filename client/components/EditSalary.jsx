import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputAdornment from "@mui/material/InputAdornment";

export default function FormDialog({ setSalary, id }) {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    //set income
    setSalary(input);
    postSalary(input);
    handleClose();
  };

  function postSalary(input) {
    fetch("/salary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ income: input, id: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Salary has been added", data);
      })
      .catch((error) => {
        console.log("error in postSalary", error);
      });
  }

  return (
    <div style={{ marginLeft: "1rem", marginTop: "0.5rem" }}>
      <Button variant="contained" color="success" onClick={handleClickOpen}>
        Edit Salary
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Salary</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your monthly income.
          </DialogContentText>
          <TextField
            id="filled-start-adornment"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            autoFocus
            margin="dense"
            name="income"
            label="New Income"
            type="text"
            fullWidth
            variant="standard"
            color="success"
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button color="success" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="success" onClick={() => handleSubmit()}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
