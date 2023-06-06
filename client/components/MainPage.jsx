import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import EditBudget from'./EditBudget';

export default function MainPage() {
  

  return(
    <Container maxWidth="lrg" sx={{display:"flex",flexDirection:"column",alignContent:"center",justifyContent:"center"}}>
        <Box sx={{ bgcolor: '#cfe8fc', height: '97.5vh', display: 'flex', flexDirection:'column' }}>
          <Typography component="h1" variant="h2" sx={{textAlign: 'center'}}>
            Budget Beacon
          </Typography>
          <Typography component="h1" variant="h4" sx={{m:3}}>
            Monthly Salary: 
          </Typography>
          <Typography component="h1" variant="h4" sx={{m:3}}>
            Monthly Budget:
          </Typography>
          <TextField
              margin="normal"
              name="expense"
              label="Expense"
              type="expense"
              id="expense"
            />
              <Button
              type="submit"
              variant="contained"
              sx={{ mx: 3, mb:2 }}
            >Add Expense</Button>
             <Button
              type="submit"
              variant="contained"
              sx={{ mx: 3, mb:2}}
            >Edit Salary</Button>
             <Button
              type="submit"
              variant="contained"
              sx={{ mx: 3, mb:2}}
            >Edit Budget</Button>
            <EditBudget/>
        </Box>
    </Container>
  )
}