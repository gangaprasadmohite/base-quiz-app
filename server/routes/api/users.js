const express = require("express");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const auth = require("../../modules/auth");
const router = express.Router();


router.post("/", (req, res, next) => {
  User.create(req.body, (err, user) => {
    if (err) return next(err);
    if (!user) return res.json({ message: "no user found!", success: false });
    res.json({ user, success: true });
  });
});


router.post("/login", (req, res, next) => {
  let { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err) return next(err);
    if (!user) return res.json({ success: false, message: "invalid Email!" });
    user.verifyPassword(password, (err, matched) => {
      if (err) return next(err);
      if (!matched)
        return res
          .status(422)
          .json({ success: false, message: "invalid password" });
      jwt.sign(
        {
          userid: user._id,
          username: user.username,
          email: user.email,
          isadmin: user.isAdmin
        },
        "secret",
        (err, token) => {
          if (err) return next(err);
          res.json({ success: true, message: "you are logged in", token });
        }
      );
    });
  });
});


router.get("/", (req, res, next) => {
  User.find({}, "-password", (err, users) => {
    if (err) return next(err);
    if (!users)
      return res.json({ success: false, message: "users not found!" });
    res.json({ users, success: true });
  });
});


router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  User.findById(id, "-password", (err, user) => {
    if (err) return next(err);
    if (!user) res.json({ success: false, message: "no user found!" });
    res.json({ user, success: true });
  });
});

router.use(auth.verifyToken);


router.put("/:id", (req, res, next) => {
  const id = req.params.id;
  User.findByIdAndUpdate(id, req.body, { new: true }, (err, user) => {
    if (err) return next(err);
    if (!user) return res.json({ success: false, message: "user not found!" });
    res.json({ user, success: true });
  });
});


router.patch("/:id", (req, res, next) => {
  const id = req.params.id;
  User.findByIdAndUpdate(id, req.body, { new: true }, (err, user) => {
    if (err) return next(err);
    if (!user) return res.json({ success: false, message: "user not found!" });
    res.json({ user, success: true });
  });
});


router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  User.findByIdAndDelete(id, (err, user) => {
    if (err) return next(err);
    if (!user) return res.json({ success: false, message: "user not found!" });
    res.json({ user, success: true, message: "succesfully deleted!" });
  });
});

module.exports = router;
