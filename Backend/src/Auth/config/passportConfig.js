require("dotenv").config();

const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const Users = require("../../Database/models/Users");

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "https://issueflow-kyr6.onrender.com/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await Users.findOne({ githubId: profile.id });

        if (!user) {
          user = await Users.create({
            githubId: profile.id,
            username: profile.username,
            avatarUrl: profile.photos[0].value,
            email: profile.emails ? profile.emails[0].value : null,
          });
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
 console.log("Serializing", user.id);  
  done(null, user.id)
});
passport.deserializeUser(async (id, done) => {
  try {
    console.log("deserializing", id);
    const user = await Users.findById(id); 
    console.log(user);
    done(null, user);
  } catch (err) {
    console.log(err);
    done(err, null);
  }
});

module.exports = passport;
