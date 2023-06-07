import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import EditBudget from'./EditBudget';
import EditSalary from'./EditSalary';

export default function MainPage({id}) {
  
  const [data, setData] = useState('');

  const [budget, setBudget] = useState(0);

  const [expenses, setExpenses] = useState([]);
  
  useEffect(() => {
    // invoke function to fetch data
    fetchData();
  }, [])
  
  useEffect(() => {
    console.log("data", data);
  }, [data])
  
  // define function to fetch data
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
  
  
  return(
    <Container maxWidth="lrg" sx={{display:"flex", flexDirection:"column", alignContent:"center", justifyContent:"center"}}>
        <Box sx={{ bgcolor: '#cfe8fc', height: '97.5vh', display: 'flex', flexDirection:'column' }}>
          <Typography component="h1" variant="h2" sx={{textAlign: 'center'}}>
            Budget Beacon
          </Typography>
          <Typography component="h1" variant="h4" sx={{m:3}}>
            Monthly Salary: 
          </Typography>
          <Typography component="h1" variant="h4" sx={{m:3}}>
            Monthly Budget: {budget}
          </Typography>
            <EditSalary />
            <EditBudget setBudget = {setBudget}/>
        </Box>
    </Container>
  )
}