const pool = require("../models/model");


function errorCreator(funcName, error) {
  return {
    log: `Express error handler caught ${funcName} error with message ${error.message};`,
    status: 400,
    message: { err: error.message },
  };
}
//post also sends back the posted data
const expenseController = {
  postExpense: async (req, res, next) => {
    try {
      const { expenses, budget_id } = req.body;
      const queryString = 'INSERT INTO expenses (expense_amount) VALUES ($1) WHERE budget_id = ($2) RETURNING *;';
      const { rows } = await pool.query(queryString, [expenses, budget_id]);
      res.locals.expenses = rows[0].expense_amount;
      return next();
    }
    catch (error) {
      return next(errorCreator("postExpense", error))
    }
  }
};

module.exports = expenseController;