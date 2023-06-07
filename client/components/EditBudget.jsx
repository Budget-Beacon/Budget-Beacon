import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputAdornment from '@mui/material/InputAdornment';

export default function FormDialog({setBudget}) {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (event) => {
    //set budget
    setBudget(input);
    //set some local state in our mainpage
    //fetch to the backend to update budget table
    handleClose();
  }

  const fetchData = async () => {
    try {
      const response = await fetch('/main', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({id:1})
      });
      const parsedData = await response.json();
      
      return setData(parsedData);
    }
    catch(err) {
      console.log("error", err);
    }
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit Budget
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Budget</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your new budget.
          </DialogContentText>
          <TextField
            id="filled-start-adornment"
            InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
            autoFocus
            margin="dense"
            name='budget'
            label="New Budget"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e)=>{setInput(e.target.value)}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={()=>handleSubmit()}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
