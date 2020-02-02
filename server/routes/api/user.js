const express = require("express");
const router = express.Router();
const auth = require("../../modules/auth");
const User = require("../../controllers/user");

router.use(auth.verifyToken);

router.get("/", User.loggedInUser);

router.put("/", User.update);

module.exports = router;
