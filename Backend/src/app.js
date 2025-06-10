require("dotenv").config();

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const passport = require("./Auth/config/passportConfig");
const authRoutes = require("./Auth/routes/routes");
const authMiddleware = require("./middlewares/authCheckMiddleware");
const projectRoutes = require("./Projects/routes/routes");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.SESSION_SECRET,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 3 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use(authMiddleware);

app.get("/dashboard", (req, res) => {
  res.status(200).send("Authorized");
});

app.use("/api/project", projectRoutes);

module.exports = app;
