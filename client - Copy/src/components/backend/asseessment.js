import React, { useEffect, useState } from "react";
import TopNav from "../utils/pagenav";
import ProfileNav from "../utils/ProfileBar";
import LoaderView from "../utils/loaderView";
import { useDispatch, useSelector } from "react-redux";

import { Checkhover } from "../utils/responsehover";
import { Avatar, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PushSpinner } from "react-spinners-kit";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CheckTopp } from "../utils/reuseable";



import { DeleteSubject, getCourses, singleSubClear } from '../../store/actions/datacollection';
import QuizPanel from "../utils/asssessmentpanel";

const Assessment= () => {
    const dispatch=useDispatch();
  const Checkuser = useSelector((item) => item.authuser);
  const navigate = useNavigate();
  const [fn, setfn] = useState("");
  const [ln, setln] = useState("");

  useEffect(()=>{
    dispatch(getCourses);
    
 
        },[dispatch])
    
  const notifications = useSelector((value) => value.notification);
  useEffect(() => {
    if (notifications && notifications.notice) {
      setloadbtn(false);
    }
  });
  useEffect(() => {
    CheckTopp();
  });
 
  const [loading, setload] = useState(true);
  const [loadingbtn, setloadbtn] = useState(false);

  const [alertProfile, setprofile] = useState(false);
  const [cat, setcat] = useState(false);
  const [catsub, setsub] = useState(false);

  useEffect(() => {
    Checkhover(setcat, setsub);
  });

  return (
    <>
      {" "}
      {!loading ? (
        <LoaderView />
      ) : (
        <>
      
       
          <div
            className="profilecontainer"
            style={{ minHeight: `${window.innerHeight}px` }}
          >
            <div>
          
            </div>
            <div className="box_layout">
              <div className="admin_box">
              <div className="profile_b_navadminmain">

           
                <div className="profile_b_navadmin">
                
                <div className="profile_cont">
                      <span
                        className="p_span"
                     
                        onClick={() => navigate("/mainadmin/dashboard")}
                      >
                        Dashboard
                      </span>
                      <span
                        className="p_span"
                        onClick={() => {

dispatch(singleSubClear())

navigate("/mainadmin/createsubject")}}
                      >
                        New Subjects
                      </span>

                    
                      <span
                        className="p_span"
                        style={{ backgroundColor: "rgb(133, 127, 127)" }}
                        onClick={() => navigate("/mainadmin/assessment")}
                      >
                        Assessment
                      </span>

                      <span className="p_span"
                       onClick={() => navigate("/mainadmin/students")}
                      >Users</span>

                      <span className="p_span"
                      
                      
                      >Sign out</span>
                    </div>
                </div>
                </div>

      <QuizPanel/>
      

           </div>
              </div>
            </div>

            <div className="footer">
              <div className="frontitemhover">
                <p>
                   Powered by Badu Tech. All rights reserved
                  <span style={{ color: "green" }}> @ </span> 2023
                </p>
              </div>
            </div>
      
        </>
      )}
    </>
  );
};

export default Assessment;
