const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;

const authController = require('./controllers/authController');
const budgetController = require('./controllers/budgetController');
const expenseController = require('./controllers/expenseController');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/login', authController.getUser, (req, res)=>{
  return res.status(201).json({userId:res.locals.userId})
});
app.post('/register', authController.checkUser, authController.registerUser, authController.getUser, (req, res) =>{
  return res.status(201).json({userId:res.locals.userId});
})

// create route handler to grab income/budget to render on load
app.post('/main', budgetController.getData, (req, res) => {
  if(res.locals.data){
    return res.status(201).json(res.locals.data);
  }else{
    return res.status(201).json({});
  }
})
// create route handler to add salary 
app.post('/salary', budgetController.checkIncome, budgetController.postIncome, (req, res) => {
  return res.status(201).json({salary: res.locals.income});
});
// create route handler to add budget
app.post('/budget', budgetController.postBudget, (req, res) => {
  return res.status(201).json({budget: res.locals.budget});
});
// create route handler to add expenses
app.post('/expenses', expenseController.postExpense, (req, res) => {
  return res.status(201).json({expenses: res.locals.expenses});
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 400,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log("ERROR: ", errorObj.log);
  const errorStatus = err.status || 500;
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT,()=>{console.log(`Server is listening on ${PORT}`)})