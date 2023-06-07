const pool = require("../models/model");

function errorCreator(funcName, error) {
  return {
    log: `Express error handler caught ${funcName} error with message ${error.message}`,
    status: 400,
    message: { err: error.message },
  };
}
//post also sends back the posted data
const budgetController = {
  getData: async (req, res, next) => {
    try {
      const { id } = req.body; 
      const queryString = `SELECT income, budget_amount FROM budgets WHERE user_id = ${id};`;
      const queryString2 = `SELECT expense_amount FROM expenses WHERE _id = ${id};`;
      const { rows } = await pool.query(queryString, [id]);
      const expenses = (await pool.query(queryString2, [id])).rows
      //expenses = [{expense_amount:200},{expense_amount:100},{expense_amount:240}]
      res.locals.data = {salary: rows[0].income, budget: rows[0].budget_amount, expenses};
      return next();
    } catch (error) {
      return next(errorCreator("getData", error));
    }
  },
  postBudget: async (req, res, next) => {
    try {
      const { budget, id } = req.body;
      // make queryString = sql command to insert budget into budget table 
      const queryString = 'INSERT INTO budgets (budget_amount) VALUES ($1) WHERE user_id = ($2) RETURNING *;';
      // call pool.query, passing in queryString and budget, await result, and save to a constant/destructure rows 
      const { rows } = await pool.query(queryString, [budget, id]);
      // send back budget 
      res.locals.budget = rows[0].budget_amount;
      return next();
    }
    catch (error) {
      return next(errorCreator("postBudget", error));
    }
  },
  postIncome: async (req, res, next) => {
    try{
      const { income, id } = req.body;
      const queryString = 'INSERT INTO budgets (income) VALUES ($1) WHERE user_id = ($2) RETURNING *;';
      const { rows } = await pool.query(queryString, [income, id]);
      res.locals.income = rows[0].income;
      return next();
    }
    catch (error) {
      return next(errorCreator("postIncome", error));
    }
  }
};

module.exports = budgetController;