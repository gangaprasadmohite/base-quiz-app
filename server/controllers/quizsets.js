const express = require("express");
const router = express.Router();
const Quizset = require("../models/quizset");


module.exports = {
listQuizsets:router.get("/", (req, res, next) => {
    Quizset.find({})
      .populate("quiz")
      .exec((err, quizsets) => {
        if (err) return next(err);
        if (!quizsets)
          return res.json({ success: false, message: "Quizsets not found!" });
        res.json({ success: true, quizsets });
      });
  }),
  

  
update:  router.put("/:id", (req, res, next) => {
    const id = req.params.id;
    Quizset.findById({ id }, (err, oldquizset) => {
      if (err) return next(err);
      if (!oldquizset)
        return res.json({ success: false, message: "quizset not found!" });
      Quizset.findByIdAndUpdate(id, (err, updatedQuizset) => {
        if (err) return next(err);
        if (!updatedQuizset)
          return res.json({ success: false, message: "can't update quizset!" });
        Quiz.findOneAndUpdate(
          { quizset: oldquizset.topic },
          { quizset: updatedQuizset.topic },
          { new: true },
          (err, updatedQuiz) => {
            if (err) return next(err);
            if (!updatedQuiz)
              return res.json({ success: false, message: "quiz not found!" });
          }
        );
      });
    });
  }),
  
  delete:router.delete("/:id", (req, res, next) => {
    const id = req.params.id;
    Quizset.findByIdAndDelete(id, (err, quizsetToDelete) => {
      if (err) return next(err);
      if (!quizsetToDelete)
        return res.json({ success: false, message: "No quizset found!" });
      res.json({
        success: true,
        quizsetToDelete,
        message: "quizset deleted succesfully!"
      });
    });
  })
}
