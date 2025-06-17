require("dotenv").config();
module.exports = (req, res, next) => {
  console.log(req.isAuthenticated(), req.session, req.user);
  if (req.isAuthenticated() && req.session.user) {
    req.user = req.session.user;
    return next();
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
};
