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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open Budget Editor
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
          
            label="New Budget"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
