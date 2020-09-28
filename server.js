require("dotenv").config();
// const cookieSession = require("cookie-session");
// const cookieParser = require("cookie-parser");
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
  // Apps on heroku are behind a trusted proxy
  trustProxy = true;
}

// passport.serializeUser((user, callback) => {
//   console.log("###hit 5");
//   callback(null, user.id);
// });

// // deserialize the cookieUserId to user in the database
// passport.deserializeUser((id, callback) => {
//   console.log("###hit 6");
//   User.findById(id)
//     .then((user) => {
//       console.log("###hit 7");
//       callback(null, user);
//     })
//     .catch((e) => {
//       callback(new Error("Failed to deserialize an user"));
//     });
// });

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
        console.log("#######hit 3");
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
      console.log("#######hit 2");
      return callback(null, currentUser);
    }
  )
);

passport.serializeUser((user, callback) => {
  console.log("###hit 5");
  callback(null, user.id);
});

// deserialize the cookieUserId to user in the database
passport.deserializeUser((id, callback) => {
  console.log("###hit 6");
  User.findById(id)
    .then((user) => {
      console.log("###hit 7");
      callback(null, user);
    })
    .catch((e) => {
      callback(new Error("Failed to deserialize an user"));
    });
});

// passport.serializeUser(function (user, callback) {
//   callback(null, user);
// });

// passport.deserializeUser(function (obj, callback) {
//   callback(null, obj);
// });

const app = express();

// app.use(
//   cookieSession({
//     name: "session",
//     keys: "thisappisawesome",
//     maxAge: 24 * 60 * 60 * 100,
//   })
// );

// app.use(cookieParser());

// app.use(
//   session({ secret: "keyboard cat", key: "sid", cookie: { secure: true } })
// );
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("client/build"));

app.use("/auth", authRoutes);

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      authenticated: false,
      message: "user has not been authenticated",
    });
  } else {
    next();
  }
};

app.get("/", authCheck, (req, res) => {
  res.status(200).json({
    authenticated: true,
    message: "user successfully authenticated",
    user: req.user,
  });
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server is running on port ${port}!`));
