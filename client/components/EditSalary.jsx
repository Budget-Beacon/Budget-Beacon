import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputAdornment from '@mui/material/InputAdornment';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) =>{
    //set income
    
    handleClose();
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
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
            InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
            autoFocus
            margin="dense"
            name='income'
            label="New Income"
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
