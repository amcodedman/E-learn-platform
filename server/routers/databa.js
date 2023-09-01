const { model, set } = require("mongoose");
const {
  QuizModel,
  QuestionModel,
  SubjectModel,
  CertModel,
  BadgeModel

} = require("./../models/Database");
const { sortArticles } = require("../middleware/utils");
const express = require("express");
const routes = express.Router();
/** creation */
routes.route("/addsubject").post(async (req, res) => {
  try {
    const data = new SubjectModel({
      ...req.body,
    });
    const content = await data.save();
    res.status(200).json(content);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

/** get queries  all */
routes.route("/getquizes").get(async (req, res) => {
  try {

    const data = await QuizModel.find({}).popuplate("questions");
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});


routes.route("/getquiz/:id").get(async (req, res) => {
  try {
    const _id = req.params.id;
    console.log(_id)
    const data = await QuizModel.findOne({_id}).populate("questions")

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});





routes.route("/getsubjects").get(async (req, res) => {
  try {
    const data = await SubjectModel.find({})
      .populate("students")
     
      .populate({ path: "quizes", populate: { path: "questions" } })

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ msg: error });
    console.log(error);
  }
});




routes.route("/getsubject/:id").get(async (req, res) => {
  try {
    const _id = req.params.id;
    const data = await SubjectModel.findOne({ _id })
      .populate("students")
  
      .populate({ path: "quizes", populate: { path: "questions" } })
    

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ msg: error });
    console.log(error);
  }
});


/**** modify */
routes.route("/modifyquiz/:id").patch(async (req, res) => {
  try {
    const _id = req.params.id;
    const data = await QuizModel.findByIdAndUpdate(
      { _id },
      {
        $set: {
          ...req.body,
        },
      },
      { new: true }
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

routes.route("/modifyquestion/:id").patch(async (req, res) => {
  try {
    console.log(req.body)
    const _id = req.params.id;
    const data = await QuestionModel.findByIdAndUpdate(
      { _id },
      {
        $set: {
          ...req.body,
        },
      },
      { new: true }
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

routes.route("/modifysubject/:id").patch(async (req, res) => {
  try {
    const _id = req.params.id;
    console.log(req.body);
    const data = await SubjectModel.findByIdAndUpdate(
      { _id },
      {
        $set: {
          ...req.body,
        },
      },
      { new: true }
    );

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

/** delete queries */


routes.route("/deletequiz/:id").delete(async (req, res) => {
  try {
    const _id = req.params.id;
    const data = await QuizModel.findByIdAndDelete({ _id });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

routes.route("/deletesubject/:id").delete(async (req, res) => {
  try {
    const _id = req.params.id;
    const data = await SubjectModel.findByIdAndDelete({ _id });

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

module.exports = routes;
