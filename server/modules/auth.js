const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  let token = req.headers.authorization;
  if (token) {
    jwt.verify(token, "secret", (err, decoded) => {
      if (err) return next(err);
      req.user = {
        userid: decoded.userid,
        token,
        username: decoded.username,
        isadmin: decoded.isadmin
      };
      next();
    });
  } else {
    res.status(401).json({ success: false, message: "Token not found" });
  }
};

exports.verifyAdmin = (req, res, next) => {
  const isAdmin = req.user.isadmin;
  return isAdmin ? next() : res.json({ success: false, message: "Not an Admin!" });
};