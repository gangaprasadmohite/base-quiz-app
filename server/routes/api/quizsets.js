const express = require("express");
const Quizset = require("../../controllers/quizsets");
const router = express.Router();
const auth = require("../../modules/auth");


router.get("/", Quizset.listQuizsets);

router.use(auth.verifyToken);
router.put("/:id", auth.verifyAdmin, Quizset.update);

router.delete("/:id", auth.verifyAdmin, Quizset.delete);

module.exports = router;
