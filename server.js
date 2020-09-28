require("dotenv").config();
const express = require("express");
const passport = require("passport");
const authRoutes = require("./routes/auth");
const User = require("./models/users");
const mongoose = require("mongoose");
var Strategy = require("passport-twitter").Strategy;

mongoose.connect("process.env.MONGODB_URL", () => {
  console.log("connected to mongo db");
});

var trustProxy = false;
if (process.env.DYNO) {
  trustProxy = true;
}

passport.use(
  new Strategy(
    {
      consumerKey: `${process.env.TWITTER_CONSUMER_KEY}`,
      consumerSecret: `${process.env.TWITTER_CONSUMER_SECRET}`,
      callbackURL:
        "https://twitter-toplinks-app.herokuapp.com/auth/twitter/redirect",
      proxy: trustProxy,
    },
    async (token, tokenSecret, profile, callback) => {
      console.log(token, profile, "#######hit 1");
      const currentUser = await User.findOne({
        twitterId: profile._json.id_str,
      });
      if (!currentUser) {
        const newUser = await new User({
          name: profile._json.name,
          screenName: profile._json.screen_name,
          twitterId: profile._json.id_str,
          profileImageUrl: profile._json.profile_image_url,
        }).save();
        if (newUser) {
          return callback(null, newUser);
        }
      }
      return callback(null, currentUser);
    }
  )
);

passport.serializeUser(function (user, callback) {
  callback(null, user);
});

passport.deserializeUser(function (obj, callback) {
  callback(null, obj);
});

const app = express();

// app.use(require("body-parser").urlencoded({ extended: true }));
app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("client/build"));

app.use("/auth", authRoutes);

// const authCheck = (req, res, next) => {
//   if (!req.user) {
//     res.status(401).json({
//       authenticated: false,
//       message: "user has not been authenticated",
//     });
//   } else {
//     next();
//   }
// };

// app.get("/", authCheck, (req, res) => {
//   res.status(200).json({
//     authenticated: true,
//     message: "user successfully authenticated",
//     user: req.user,
//   });
// });

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server is running on port ${port}!`));
