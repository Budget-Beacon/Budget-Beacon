const { query } = require('../models/model');
const bcrypt = require('bcrypt');

function errorCreator(funcName, error) {
  console.log(error.message);
  return {
    log: `Express error handler caught ${funcName} error with message ${error.message}`,
    status: 400,
    message: { err: error.message },
  };
}
//login, logout
const authController = {
  // used if user exists
  checkUser: async (req, res, next) => {
    try {const { username } = req.body;
    const queryString = 'SELECT * FROM public.users WHERE username = $1';
    const { rows } = await query(queryString, [username]);
    if (!rows.length){
      return next();
    }
    else {
      return res.status(200).json({success:false});
    }
    //query DB for username and password
    return next();
  }catch (error) {
    return next(errorCreator("checkUser", error));
    }
  },
  // verify user with pass
  getUser: async (req, res, next) => {
    try {const { username, password } = req.body;
    const queryString = 'SELECT * FROM public.users WHERE username = $1';
    
    const { rows } = await query(queryString, [username]);
    if (!rows.length){
      res.locals.newUser = true;
      return next();
    }
    //query DB for username and password
    return next();
  }catch (error) {
    return next(errorCreator("checkUser", error));
    }
  },
  registerUser: async (req, res, next) => {
    try{
      const { username, password } = req.body;
      //query DB for username and password
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
      const insertUser =`INSERT INTO users (username, password)
        VALUES ($1, $2) RETURNING *;`;
      const params = [username, passwordHash];
      const { rows } = await query(insertUser, params);
      if(rows.length){
        res.locals.userId = rows[0]._id;
      }
      return next();
    } catch (error) {
      return next(errorCreator("registerUser", error));
    }
  },
  
}

module.exports = authController;