const bcryt = require("bcrypt");
const mongoose = require("mongoose");

const quizSchema = mongoose.Schema({
  subject:{
    type:mongoose.Schema.Types.ObjectId,ref:"subjects"
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "question",
    },
  ],

  title: {
    type: String,
    required: true,
  },
  detail:{
    type: String,
  },
  

  duration: {
    type: Number,
  },

});
const questionSchema = mongoose.Schema({
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "quizes",
  },
  question: {
    type: String,
    required: true,
  },
  a: {
    type: String,
    required: true,
  },
  b: {
    type: String,
    required: true,
  },
  c: {
    type: String,
    required: true,
  },

  d: {
    type: String,
    required: true,
  },
  point: {
    type: Number,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});
const SubjectSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    detail: {
      type: String,
    },
    file: {
      type: String,
    },

    quizes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "quizes",
      },
    ],
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
  },
  { timestamps: true }
);

const badgesSchema = mongoose.Schema({
  name: {
    type: String,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subject",
  },
  
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "quizes",
  },
  
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

const questionandanswerSchema = mongoose.Schema({
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "quizereturn",
  },
  try:{
    type:String
  },
  test_id:{
    type:String
  },
  user:{
    type:String
  },
  question: {
    type: String,
    required: true,
  },
  a: {
    type: String,
    required: true,
  },
  b: {
    type: String,
    required: true,
  },
  c: {
    type: String,
    required: true,
  },

  d: {
    type: String,
  },
  point: {
    type: Number,
  },
  score:{
    type: Number,
  }
,
  chosen: {
    type: String,
  },
  answer: {
    type: String,
  },
  status: {
    type: Boolean,
  },
});
const quizReturnSchema = mongoose.Schema({
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "quizes",
  },
  quizename: {
    type: String,
  },
  returned: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "questionandanswer",
    },
  ],
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  total_point: {
    type: Number,
    default:0
  },
  total_score: {
    type: Number,
    default:0
  },
  score_rate:{
    type: Number,
  }
},{timestamps:true});

const QuestionModel = mongoose.model("question", questionSchema);
const QuizModel = mongoose.model("quizes", quizSchema);
const SubjectModel = mongoose.model("subjects", SubjectSchema);
const QuestionandanswerModel = mongoose.model(
  "questionandanswer",
  questionandanswerSchema
);
const quizReturnModel = mongoose.model("quizereturn", quizReturnSchema);

const BadgeModel = mongoose.model("badge", badgesSchema);

module.exports = {
  QuestionandanswerModel,
  quizReturnModel,
  QuizModel,
  QuestionModel,
  SubjectModel,

  BadgeModel,
};
