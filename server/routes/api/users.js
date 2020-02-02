const express = require("express");
const Users = require("../../controllers/users");
const auth = require("../../modules/auth");
const router = express.Router();

router.post("/", Users.create);

router.post("/login", Users.login);

router.get("/", Users.listUsers);

router.get("/:id", Users.getUser);  

router.use(auth.verifyToken);
router.put("/:id", Users.update);

router.patch("/:id", Users.updatePart);

router.delete("/:id", Users.delete);


module.exports = router;
