require("dotenv").config();
module.exports = (req, res, next) => {
  if (req.isAuthenticated() && req.session.user) {
    req.user = req.session.user;
    return next();
  } else {
    res.status(401).json({
      message: "Unauthorized",
    });
    res.redirect(process.env.FRONTEND_URL + "/auth/login");
  }
};
