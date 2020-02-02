const express = require("express");
const router = express.Router();
const Admin = require('../../controllers/admins')


router.post("/", Admin.create)

router.post("/login", Admin.login);

router.get("/", Admin.listAdmins);

module.exports = router;
