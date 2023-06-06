const pool = require("../models/model");

//post also sends back the posted data
const budgetController = {
  postData: async (req, res, next) => {
    try {
      const { input } = req.body;
      // make queryString = sql command to insert budget into budget table 
      const queryString = 'INSERT INTO budgets (income) VALUES ($1) RETURNING *';
      // call pool.query, passing in queryString and input, await result, and save to a constant/destructure rows 
      const { rows } = await pool.query(queryString, [input]);
      // send back budget 
      // rows = [ { _id: 0, username: '123', password: 'hashed' } ]
      res.locals.budget = rows[0].income;
      return next();
    }
    catch (error) {
      return next(err)
    }
  }
};
module.exports = budgetController;