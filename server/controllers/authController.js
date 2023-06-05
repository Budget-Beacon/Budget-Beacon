//login, logout
const authController = {
  getUser: (req, res, next) => {
    const { username, password } = req.body;
    //query DB for username and password
    return next();
  }
}

module.exports = authController;