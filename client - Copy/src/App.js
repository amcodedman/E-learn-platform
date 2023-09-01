import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import MyForm from "./components/Front/RegistrationForm";

import Home from "./components/Front/home";

import { showToastify } from "./components/utils/reuseable";
import { ClearNotify } from "./store/actions/notification";
import "./components/style/custome.css";

import Resetpasspage from "./components/Front/resetpassword";
import ConfirmAccount from "./components/Front/confirmAccount";

import { AutoLogin, CheckLogin, getAllUsers } from "./store/actions/adminActions";
import CreateSections from "./components/utils/createsection";
import Mycourses from "./components/backend/asseessment";
import CourseDetail from "./components/backend/viewDetailCourse";
import Dasboard from "./components/backend/dasboard";
import Assessment from "./components/backend/asseessment";

import AddSubjects from "./components/backend/subjects";
import NewSubject from "./components/backend/subjects";

import Students from "./components/backend/students";
import TryQuiz from "./components/Front/tryquestions";
import TakeQuiz from "./components/Front/assessmentpage";
import Login from "./components/Front/login";
import SignInUser from "./components/Front/signin";
import HomeDashbord from "./components/Front/dashboard";
import PlayQuiz from "./components/utils/playgame";
import UserDashbord from "./components/Front/userprofile";
import Authcontainer from "./components/utils/authuser";
import TryQuizes from "./components/Front/TryQ";


function App() {
  const notifications = useSelector((value) => value.notification);
  const dispatch = useDispatch();
useEffect(()=>{
dispatch(getAllUsers())
},[dispatch])
  useEffect(() => {
    dispatch(CheckLogin());
  }, []);

  useEffect(() => {
    dispatch(AutoLogin());
  }, [dispatch]);

  useEffect(() => {
    if (notifications && notifications.notice) {
      if (notifications.success) {
        showToastify("SUCCESS", notifications.notice.msg);
        dispatch(ClearNotify());
      }
      if (notifications.success === false) {
        showToastify("ERROR", notifications.notice.msg);
        dispatch(ClearNotify());
      }
      window.scrollTo(0, 0);
    }
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
           
              <Home />
          
          }
        />
    
        <Route
          path="/account/verification"
          element={
            
              <ConfirmAccount />
          }
        />
        <Route
          path="/account/passwordreset"
          element={
          
              <Resetpasspage />
           
          }
        />
  
      
        <Route path="/mainadmin/createsubject" element={<NewSubject />}></Route>
        <Route path="/mainadmin/dashboard" element={<Dasboard />}></Route>
       
        <Route path="/mainadmin/assessment" element={<Assessment />}></Route>
        <Route path="tryassessment" element={<TryQuiz />}></Route>
        <Route path="/playgame" element={<Authcontainer><PlayQuiz /></Authcontainer>}></Route>
        <Route path="/tryquiz/begin/:subject/:name/:id/:duration" element={<TryQuizes />}></Route>
        <Route path="/myassessment/begin/:subject/:name/:id/:duration" element={<Authcontainer><TakeQuiz /></Authcontainer>}></Route>
        <Route path="/dashbord/login" element={<Login />}></Route>
        <Route path="/user/login" element={<SignInUser />}></Route>
        <Route path="/user/Signup" element={<MyForm/>}></Route>
        <Route path="/home/dashboard" element={<Authcontainer><HomeDashbord/></Authcontainer>}></Route>
        <Route path="/user/dashboard" element={<Authcontainer><UserDashbord/></Authcontainer>}></Route>
        <Route
          path="/mainadmin/students"
          element={
         
              <Students/>
        
          }
        ></Route>
     
        <Route
          path="/mainadmin/singlecourse/:id"
          element={
           
              <CourseDetail />
        
          }
        ></Route>
     
 
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
