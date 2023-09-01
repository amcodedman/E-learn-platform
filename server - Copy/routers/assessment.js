const express = require("express");
const {
  QuestionandanswerModel,
  quizReturnModel,
  QuizModel,
  QuestionModel,
  SubjectModel,
  BadgeModel,
} = require("../models/Database");
const { User } = require("../models/users");
const Routers = express.Router();

Routers.route("/createquiz").post(async (req, res) => {
  try {
    const data = new QuizModel({
      ...req.body,
    });

    const result = await data.save();

    const _id = req.body.subject;
    const subjectupdate = await SubjectModel.findByIdAndUpdate(
      { _id },
      {
        $push: {
          quizes: result._id,
        },
      },
      { new: true, useFindAndModify: false }
    );

    console.log(subjectupdate);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
});
Routers.route("/addquestion").post(async (req, res) => {
  try {
    const _id = req.body.quiz;

    const question = new QuestionModel({
      ...req.body,
    });
    const saved = await question.save();

    const updateassessment = await QuizModel.findByIdAndUpdate(
      { _id },
      {
        $push: {
          questions: saved._id,
        },
      },
      {
        new: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json(updateassessment);
  } catch (error) {
    res.status(400).json({ msg: "error adding" });
  }
});
Routers.route("/deletequestion/:id").delete(async (req, res) => {
  try {
    const question = await QuestionModel.findByIdAndDelete({
      _id: req.params.id,
    });
    res.status(200).json(question);
  } catch (error) {}
});
Routers.route("/deleteassessment/:id").delete(async (req, res) => {
  try {
    const question = await QuizModel.findByIdAndDelete({
      _id: req.params.id,
    });
    res.status(200).json(question);
  } catch (error) {
    console.log(error);
  }
});
Routers.route("/updateassessment/:id").patch(async (req, res) => {
  try {
    const question = await QuizModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          ...req.body,
        },
      },
      {
        new: true,
      }
    );
    res.status(200).json(question);
  } catch (error) {
    console.log(error);
  }
});
Routers.route("/updatequestion/:id").patch(async (req, res) => {
  try {
    const question = await QuestionModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          ...req.body,
        },
      },
      {
        new: true,
      }
    );
    res.status(200).json(question);
  } catch (error) {
    console.log(error);
  }
});

Routers.route("/createfeedback").post(async (req, res) => {
  try {
    const quiz_id = req.body.quiz_id;
    const title = req.body.title;
    const studentid = req.body.studentid;
    const data = new quizReturnModel({
      ...req.body,
    });

    results = await data.save();
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: error });
  }
});

Routers.route("/checktakenassessment").post(async (req, res) => {
  try {
    const quiz_id = req.body.quiz_id;
    const title = req.body.title;
    const studentid = req.body.studentid;
    console.log(req.body);

    const finddonequiz = await quizReturnModel.find({
      quiz: quiz_id,
      quizename: title,
      student: studentid,
    });
    if (finddonequiz && finddonequiz.length > 0) {
      res.status(200).json({
        result: {},
        summary: {
          status: false,
          notice: true,
        },
      });
    } else {
      res.status(200).json({
        result: {},
        summary: {
          status: false,
          notice: false,
        },
      });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });

    console.log(error);
  }
});
Routers.route("/answerreturn").post(async (req, res) => {
  try {
    let userpoints = 0;
    const subjectid = req.body.subjectid;
    const next = req.body.next;
    const feedback_id = req.body.feedback_id;
    const choose = req.body.choose;
    const question = req.body.question;
    const question_id = req.body.question_id;
    const studentid = req.body.studentid;
    const quiz_id = req.body.quiz_id;
    const title = req.body.title;
    let totalp = 0;
    let totalc = 0;

    const checkquestion = await QuestionModel.findOne({
      _id: question_id,
    });

    if (checkquestion) {
      let scorepoint = 0;
      let status = false;
      if (checkquestion.answer === choose) {
        status = true;
        scorepoint = checkquestion.point;
      }
      if (!(checkquestion.answer === choose)) {
        scorepoint = 0;
      }

      const answerreturn = new QuestionandanswerModel({
        question: question,
        a: checkquestion.a,
        b: checkquestion.b,
        c: checkquestion.c,
        d: checkquestion.d,
        test_id: quiz_id,
        user: studentid,
        score: scorepoint,
        point: checkquestion.point,
        chosen: choose,
        answer: checkquestion.answer,
        status: status,
      });

      const savedresult = await answerreturn.save();
      if (!next) {
        const datar = new quizReturnModel({
          quiz_id,
          quiz: quiz_id,
          quizename: title,
          student: studentid,
        });
        const savefeed = await datar.save();

        const questionall = await QuestionandanswerModel.find({
          test_id: quiz_id,
          user: studentid,
        });

        if (questionall) {
          console.log({ initial: totalp, ss: totalc });

          questionall.forEach(async (retuns) => {
            totalp = totalp + retuns.point;
            totalc = totalc + retuns.score;
            const findfeedback = await quizReturnModel.findOne({
              _id: savefeed._id,
            });

            let returns_t_score = 0;
            let returns_t_point = 0;
            if (retuns.point) {
              returns_t_point = retuns.point;
            } else {
              returns_t_point = 0;
            }
            if (retuns.score) {
              returns_t_score = retuns.score;
            } else {
              returns_t_score = 0;
            }
            if (findfeedback) {
              await quizReturnModel.findByIdAndUpdate(
                { _id: findfeedback._id },
                {
                  $push: {
                    returned: retuns._id,
                  },
                  $set: {
                    total_point: totalp,
                    total_score: totalc,
                  },
                },
                {
                  new: true,
                  useFindAndModify: false,
                }
              );
            }
          });
        }

        let badgename = "No Award";
        if (savefeed) {
          await quizReturnModel.findByIdAndUpdate(
            { _id: savefeed._id },
            {
              $set: {
                score_rate: (totalc / totalp) * 100,
              },
            },
            {
              new: true,
            }
          );

          await QuestionandanswerModel.updateMany(
            { test_id: quiz_id, user: studentid },
            {
              $set: {
                quiz: savefeed._id,
              },
            }
          );

          if ((totalc / totalp) * 100 === 100) {
            badgename = "The Don";
          }
          if ((totalc / totalp) * 100 >= 90 && (totalc / totalp) * 100 < 100) {
            badgename = "Pythagoras";
          }
          if ((totalc / totalp) * 100 >= 80 && (totalc / totalp) * 100 < 90) {
            badgename = "Hypatia";
          }

          if ((totalc / totalp) * 100 >= 70 && (totalc / totalp) * 100 < 80) {
            badgename = "Intermediate";
          }

          if ((totalc / totalp) * 100 > 70) {
            const newbadge = new BadgeModel({
              name: badgename,
              subject: subjectid,
              student: studentid,
              quiz: quiz_id,
            });

            const savebadge = await newbadge.save();
            const finduser = await User.findById({ _id: studentid });

            if (finduser) {
              userpoints = finduser.totalpoints;
              userpoints = userpoints + totalc;
            }

            await User.findByIdAndUpdate(
              { _id: studentid },
              {
                $push: {
                  quizes: savefeed._id,
                  badges: savebadge._id,
                },
                $set: {
                  subjects: subjectid,
                  totalpoints: userpoints,
                },
              },
              {
                new: true,
                useFindAndModify: false,
              }
            );
          } else {
            const dd = await QuestionandanswerModel.deleteMany({
              test_id: quiz_id,
              user: studentid,
              quiz: savefeed._id,
            });
            await QuestionandanswerModel.findByIdAndDelete({
              _id:savefeed._id
            });
          
          }
        }

        res.status(200).json({
          result: savedresult,
          summary: {
            status: true,
            badge: badgename,
            score: totalc,
            totalpoint: totalp,
            averages: (totalc / totalp) * 100,
            notice: false,
          },
        });
      } else {
        res.status(200).json({
          result: savedresult,
          summary: {
            status: false,
            notice: false,
          },
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

Routers.route("/answertry").post(async (req, res) => {
  try {
    const next = req.body.next;
    const feedback_id = req.body.feedback_id;
    const choose = req.body.choose;
    const question = req.body.question;
    const question_id = req.body.question_id;

    const quiz_id = req.body.quiz_id;
    const title = req.body.title;
    let totalp = 0;
    let totalc = 0;
    const checkquestion = await QuestionModel.findOne({
      _id: question_id,
    });

    if (checkquestion) {
      let scorepoint = 0;
      let status = false;
      if (checkquestion.answer === choose) {
        status = true;
        scorepoint = checkquestion.point;
      }
      if (!(checkquestion.answer === choose)) {
        scorepoint = 0;
      }

      const answerreturn = new QuestionandanswerModel({
        question: question,
        a: checkquestion.a,
        b: checkquestion.b,
        c: checkquestion.c,
        d: checkquestion.d,
        test_id: quiz_id,

        score: scorepoint,
        point: checkquestion.point,
        chosen: choose,
        answer: checkquestion.answer,
        status: status,
      });

      let savedresult = await answerreturn.save();
      if (!next) {
        const datar = new quizReturnModel({
          quiz_id,
          quiz: quiz_id,
          quizename: title,
        });

        const savefeed = await datar.save();

        const questionall = await QuestionandanswerModel.find({
          test_id: quiz_id,
        });

        if (questionall) {
          questionall.forEach(async (retuns) => {
            totalp = totalp + retuns.point;
            totalc = totalc + retuns.score;

            const findfeedback = await quizReturnModel.findOne({
              _id: savefeed._id,
            });

            let returns_t_score = 0;
            let returns_t_point = 0;
            if (retuns.point) {
              returns_t_point = retuns.point;
            } else {
              returns_t_point = 0;
            }
            if (retuns.score) {
              returns_t_score = retuns.score;
            } else {
              returns_t_score = 0;
            }
            if (findfeedback) {
              await quizReturnModel.findByIdAndUpdate(
                { _id: findfeedback._id },
                {
                  $push: {
                    returned: retuns._id,
                  },
                  $set: {
                    total_point: totalp,
                    total_score: totalc,
                  },
                },
                {
                  new: true,
                  useFindAndModify: false,
                }
              );
            }
          });
        }
        let badgename = "No Award";
        if (savefeed) {
          await quizReturnModel.findByIdAndUpdate(
            { _id: savefeed._id },
            {
              $set: {
                score_rate: (totalc / totalp) * 100,
              },
            },
            {
              new: true,
            }
          );

          console.log((totalc / totalp) * 100);
          if ((totalc / totalp) * 100 === 100) {
            badgename = "The Don";
          }
          if ((totalc / totalp) * 100 >= 90 && (totalc / totalp) * 100 < 100) {
            badgename = "Pythagoras";
          }
          if ((totalc / totalp) * 100 >= 80 && (totalc / totalp) * 100 < 90) {
            badgename = "Hypatia";
          }

          if ((totalc / totalp) * 100 >= 70 && (totalc / totalp) * 100 < 80) {
            badgename = "Intermediate";
          }
        }

        await QuestionandanswerModel.updateMany(
          { test_id: quiz_id, try: "studentid" },
          {
            $set: {
              quiz: savefeed._id,
            },
          }
        );



        res.status(200).json({
          result: savedresult,
          summary: {
            status: true,
            badge: badgename,
            score: totalc,
            totalpoint: totalp,
            averages: (totalc / totalp) * 100,
          },
        });




         await QuestionandanswerModel.deleteMany({
           quiz: savefeed._id,
          test_id: quiz_id, try: "studentid"
        });
        await QuestionandanswerModel.findByIdAndDelete({
          _id:savefeed._id
        });

      } else {
        res.status(200).json({
          result: savedresult,
          summary: {
            status: false,
          },
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
});
Routers.route("/getassessment/:id").get(async (req, res) => {
  try {
    const _id = req.params.id;
    const result = await quizReturnModel
      .find({ _id })
      .populate("quiz")
      .populate("returned")
      .populate("student");
    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
  }
});

Routers.route("/getassessments").get(async (req, res) => {
  try {
    const result = await quizReturnModel
      .find({})
      .populate("quiz")
      .populate("returned")
      .populate("student");
    res.status(200).json(result);
    console.log({ result: result });
  } catch (error) {
    console.log(error);
  }
});
module.exports = Routers;
