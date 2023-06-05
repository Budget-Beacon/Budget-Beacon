const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;

const authController = require('../controllers/authController');
const budgetController = require('../controllers/budgetController');

app.use(express.json());
//app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.post('/login', (req, res))

app.listen(PORT,()=>{console.log(`Server is listening on ${PORT}`)})