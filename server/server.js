const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;

const authController = require('./controllers/authController');
const budgetController = require('./controllers/budgetController');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/login', authController.getUser, (req, res)=>{
  return res.status(201).json({userId:res.locals.userId})
});
app.post('/register', authController.checkUser, authController.registerUser, authController.getUser, (req, res) =>{
  return res.status(201).json({userId:res.locals.userId});
})

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