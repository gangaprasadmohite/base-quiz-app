const express = require("express");
const router = express.Router();
const Question = require("../../controllers/quizzes");
const Quizset = require("../../models/quizset");
const auth = require("../../modules/auth");

router.get("/", Question.listQuizzes);

router.use(auth.verifyToken);
router.use(auth.verifyAdmin)

router.post("/", auth.verifyAdmin, Question.create);

router.get("/:id", auth.verifyAdmin, Question.quiz);

router.put("/:id", auth.verifyAdmin, Question.update);

router.delete("/:id", auth.verifyAdmin, Question.delete);

module.exports = router;
