import { TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { PushSpinner } from "react-spinners-kit";
import * as Yup from "yup";

import {
 
  getCourses, getreturnassessment,
} from "../../store/actions/datacollection";
import { AspectRatioFill, Book, BookFill, PeopleFill, PersonWorkspace } from "react-bootstrap-icons";
import { getAllUsers } from "../../store/actions/adminActions";
import { useNavigate } from "react-router-dom";

const MyDasboard = () => {


  const navigate=useNavigate(true);
  const dispatch = useDispatch();
  const students=useSelector(value=>value.students);
  const subjects=useSelector((value)=>value.Allsubjects)
  const [totalassessment,setassessmentcount]=useState(0)
  const [totalreturnquiz,setreturnquiz]=useState(0)

useEffect(()=>{
  dispatch(getreturnassessment())
},[dispatch])
  useEffect(()=>{
    setassessmentcount(0)
    if(subjects && subjects.data){
      subjects.data.map(data=>{
        setassessmentcount(totalassessment+data.quizes.length);
        return true
      })


    }
  },[dispatch])


  const [loadingbtn, setloadbtn] = useState(false);





  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);
 
 
  return (
    <div className="profile_box_m_admin">
      <div className="dashboardlayout">
        <div className="dashboardbox">
          <p>Total Users</p>
          <div>
            <PeopleFill size={40} />
            <span className="boxvalue">{ students && students.data ? students.data.length :0  }</span>
          </div>

          <div className="boxbtn" 
           onClick={() => navigate("/mainadmin/students")}>Explore more</div>
        </div>
        <div className="dashboardbox">
          <p>Total Subjects available</p>

          <div>
            <Book size={40} />
            <span className="boxvalue">{subjects && subjects.data ?  subjects.data.length :0}</span>
          </div>

          <div className="boxbtn"
            onClick={() => navigate("/mainadmin/assessment")}>Explore more</div>
        </div>
        <div className="dashboardbox">
          <p>Total Assessment Available</p>
          <div>
            <PersonWorkspace size={40} />
            <span className="boxvalue">{totalassessment}</span>
          </div>

          <div className="boxbtn"
            onClick={() => navigate("/mainadmin/assessment")}>Explore more</div>
        </div>
        <div className="dashboardbox"
         
         >
          <p>Total Assessment Returned</p>
          <div>
            <AspectRatioFill size={40} />
            <span className="boxvalue">10</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MyDasboard;
