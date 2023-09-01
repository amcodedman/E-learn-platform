import {combineReducers} from "redux";

import notification from "./notification";
import personal from "./personal";

import authuser from "./authuser";

import newSection from "./newsection";

import newSubject from "./newcourse";
import newQuiz from "./Contents";
import Allsubjects from "./allcourses";
import singleSubject from "./courseD";
import students from "./allusers";

import feedback from "./feedbackquiz";
import feedreturn from "./feedreturn";
import quizesdone from "./returnedquiz";
import summary from "./summary";

const appReducers=combineReducers({
    personal,
    authuser,
    notification,
    students,
    quizesdone,
    newSubject,
   newSection,Allsubjects,
   newQuiz,
   feedback,feedreturn
   ,
   summary
  ,
    singleSubject,
   


})

export default appReducers