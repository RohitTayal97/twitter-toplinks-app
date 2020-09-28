const router = require("express").Router();
const passport = require("passport");

router.get("/login/success", (req, res) => {
  console.log("###hitt 7");
  if (req.user) {
    res.json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "user failed to authenticate.",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
  // req.session.destroy(function (err) {
  //   res.redirect('/'); //Inside a callback… bulletproof!
  // });
});

router.get("/twitter", passport.authenticate("twitter"));

router.get(
  "/twitter/redirect",
  passport.authenticate("twitter", {
    failureRedirect: "/auth/login/failed",
  }),
  function (req, res) {
    console.log("#######hit 4");
    res.redirect("/");
  }
);

module.exports = router;
