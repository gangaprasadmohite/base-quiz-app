const express = require("express");
const router = express.Router();
const Question = require("../../controllers/quizzes");
const auth = require("../../modules/auth");

// list all quizes

router.get("/", Question.listQuizzes);

//get questions

router.get("/:topic/questions", Question.questions);

router.use(auth.verifyToken);

// only admins can access

// get a quiz

router.get("/:id", auth.verifyAdmin, Question.quiz);

//update quiz

router.put("/:id", auth.verifyAdmin, Question.update);

//delete a quiz

router.delete("/:id", auth.verifyAdmin, Question.delete);

module.exports = router;