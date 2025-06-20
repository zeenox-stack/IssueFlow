require("dotenv").config();

const express = require("express");
const router = express.Router();

const passport = require("../config/passportConfig");

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user", "repo"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: process.env.FRONTEND_URL + "/auth/login",
  }),
  (req, res, next) => {
    req.login(req.user, (error) => {
      if (error) return next(error); 

      console.log("user on login callback:", req.user);
      console.log("session before save:", req.session);

      req.session.save((err) => {
        if (err) {
          console.error("Error: ", err);
          return res.status(500).json({ error: "Error logging in" });
        }

        res.redirect(process.env.FRONTEND_URL + "/dashboard");
      });
    });
  }
);

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.redirect(process.env.FRONTEND_URL + "/");
    });
  });
});

module.exports = router;
