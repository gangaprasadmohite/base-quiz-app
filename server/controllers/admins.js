const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");

module.exports = {
  create: async (req, res, next) => {
    try {
      let admin = await Admin.create(req.body);
      if (!admin)
        return res.json({ message: "can't create Admin", success: false });
      res.json({ admin, success: true });
    } catch (err) {
      return next(err);
    }
  },
// login Admin

  login: async (req, res, next) => {
    let { email, password } = req.body;
    try {
      let user = await Admin.findOne({ email });
      if (!user) return res.json({ success: false, message: "Invalid Email!" });
      user.verifyPassword(password, (err, matched) => {
        if (err) return next(err);
        if (!matched)
          return res.json({ success: false, message: "Invalid Password!" });

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
    } catch (err) {
      return next(err);
    }
  },

//list al admins
  listAdmins: async (req, res, next) => {
    try {
      let admins = await Admin.find({}, "-password");
      if (!admins)
        return res.json({ success: false, message: "admins not found!" });
      res.json({ admins, success: true });
    } catch (err) {
      return next(err);
    }
  }
};