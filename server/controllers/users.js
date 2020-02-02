const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");


module.exports = {

create: router.post("/", (req, res, next) => {
    User.create(req.body, (err, user) => {
      if (err) return next(err);
      if (!user) return res.json({ message: "no user found!", success: false });
      res.json({ user, success: true });
    });
  }),
  
  
login:   router.post("/login", (req, res, next) => {
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
  }),
  
  
 listUsers: router.get("/", (req, res, next) => {
    User.find({}, "-password", (err, users) => {
      if (err) return next(err);
      if (!users)
        return res.json({ success: false, message: "users not found!" });
      res.json({ users, success: true });
    });
  }),
  
  
  getUser:router.get("/:id", (req, res, next) => {
    const id = req.params.id;
    User.findById(id, "-password", (err, user) => {
      if (err) return next(err);
      if (!user) res.json({ success: false, message: "no user found!" });
      res.json({ user, success: true });
    });
  }),
  
  
  
  update:router.put("/:id", (req, res, next) => {
    const id = req.params.id;
    User.findByIdAndUpdate(id, req.body, { new: true }, (err, user) => {
      if (err) return next(err);
      if (!user) return res.json({ success: false, message: "user not found!" });
      res.json({ user, success: true });
    });
  }),
  
  
  updatePart:router.patch("/:id", (req, res, next) => {
    const id = req.params.id;
    User.findByIdAndUpdate(id, req.body, { new: true }, (err, user) => {
      if (err) return next(err);
      if (!user) return res.json({ success: false, message: "user not found!" });
      res.json({ user, success: true });
    });
  }),
  
  delete:router.delete("/:id", (req, res, next) => {
    const id = req.params.id;
    User.findByIdAndDelete(id, (err, user) => {
      if (err) return next(err);
      if (!user) return res.json({ success: false, message: "user not found!" });
      res.json({ user, success: true, message: "succesfully deleted!" });
    });
  })

}