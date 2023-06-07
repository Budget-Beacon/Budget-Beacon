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
      const queryString = `SELECT income, budget_amount, _id FROM budgets WHERE user_id = $1;`;
      const queryString2 = `SELECT expense_amount FROM expenses WHERE _id = $1;`;
      const { rows } = await pool.query(queryString, [id]);
      const expenses = (await pool.query(queryString2, [id])).rows;
      //expenses = [{expense_amount:200},{expense_amount:100},{expense_amount:240}]
      if (rows.length) {
        res.locals.data = {
          salary: rows[0].income,
          budget: rows[0].budget_amount,
          expenses: expenses,
          budgetId: rows[0]._id,
        };
      }
      return next();
    } catch (error) {
      return next(errorCreator("getData", error));
    }
  },
  postBudget: async (req, res, next) => {
    try {
      const { budget, id } = req.body;
      // make queryString = sql command to insert budget into budget table
      const queryString =
        "UPDATE budgets SET budget_amount = $1 WHERE user_id = $2 RETURNING *;";
      // call pool.query, passing in queryString and budget, await result, and save to a constant/destructure rows
      const { rows } = await pool.query(queryString, [budget, id]);
      console.log("postBudget", rows);
      // send back budget
      res.locals.budget = rows[0].budget_amount;
      return next();
    } catch (error) {
      return next(errorCreator("postBudget", error));
    }
  },
  postIncome: async (req, res, next) => {
    try {
      const { income, id } = req.body;
      let queryString;
      if (res.locals.income) {
        queryString =
          "UPDATE budgets SET income = $1 WHERE user_id = $2 RETURNING *;";
      } else {
        queryString =
          "INSERT INTO budgets (income , user_id) VALUES ($1, $2) RETURNING *;";
      }
      const { rows } = await pool.query(queryString, [income, id]);
      res.locals.income = rows[0].income;
      return next();
    } catch (error) {
      return next(errorCreator("postIncome", error));
    }
  },
  checkIncome: async (req, res, next) => {
    try {
      const { id } = req.body;
      const queryString = "SELECT * FROM budgets WHERE user_id = $1;";
      const { rows } = await pool.query(queryString, [id]);
      if (rows.length) {
        res.locals.income = true;
      } else {
        res.locals.income = false;
      }
      return next();
    } catch (error) {
      return next(errorCreator("checkIncome", error));
    }
  },
};

module.exports = budgetController;
