require("dotenv").config();
module.exports = (req, res, next) => {
  if (req.isAuthenticated() && req.session.user) {
    req.user = req.session.user;
    return next();
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
};
