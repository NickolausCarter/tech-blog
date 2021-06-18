// user authentication function for use when needed in application
const isAuth = (req, res, next) => {
  if (!req.session.user_id) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = isAuth;