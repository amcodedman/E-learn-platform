import React, { useEffect, useState } from "react";

import { ArrowUp, ArrowDown, ArrowUpShort,Trash } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import {  DeleteQuestion,  DeleteQuiz,  getCourse } from "../../store/actions/datacollection";
import { RawToHtml } from "../utils/rawtohtml";
import { IconButton } from "@mui/material";
import DeleteContentID from "../utils/deletecontent";


const CourseContent = (props) => {
  const [showsection, setshow] = useState(false);
  const [quizid, setid] = useState("");
  const newSubject=useSelector((value)=>value.newSubject)
  const newcontent=useSelector((value)=>value.newContents)
  const [quizes,setquizes]=useState(null);
  const [quizquestions,setquestions]=useState(null);
  const dispatch=useDispatch();

  const [courseid,setcourseid]=useState("")
  
  
    

  const singleSubject=useSelector((value)=>value.singleSubject)
  useEffect(()=>{
    if(singleSubject && singleSubject.data){
      if( singleSubject.data.quizes.length >0){
        setcourseid(newSubject.data._id);
        setquizes(singleSubject.data.quizes)
  
      }
    }
  })


  useEffect(() =>{
  if(quizes){
    setquestions(quizes.questions)
  }
  })
  


  









  return (
    <div>
    {
      quizes ?
      quizes.map((lists,index)=>{
    return(
     
        <div className="content_c">
        
      <div>
        <h1>{lists.title}</h1>
        <p>
        {
          lists.detail
        }
         
        </p>

        <p>
        Duration:
        {
          lists.duration
        }
         minutes
         
        </p>

        <div className="btnlayout">
        {showsection ? (
          <span className="contentshowbtn"  onClick={() => {
                setshow(false);
                setid("")
                props.changefield(false)
              }}>
          Close Tab{" "}
            <ArrowUpShort
              size={12}
             
            />
          </span>
        ) : (
          <span className="contentshowbtn"   onClick={() => {
                
                setid(lists._id)
                setshow(true);
              }}>
           Explore Questions{" "}
            <ArrowDown
              size={12}
            
            />
          </span>
        )}


    
              <IconButton    onClick={()=>{
               dispatch( DeleteQuiz(lists._id))
               dispatch(getCourse(courseid)); 
          
              }}>

                <Trash size={15} color="black"/>
              </IconButton>
          
          
         

        </div>

      
      </div>

      {showsection && quizid===lists._id ? 
      <div className="content_section">
      <div className="contentnav">
      <span className="contentshowbtn"  onClick={() => {
        props.setcontentid(lists._id)
        props.changefield(true)
                setTimeout(()=>{
                 
                    document.querySelector('#editor').scrollIntoView({behavior:"smooth"})
            
                },500)
              
              
              }}>
           Add Question
          
          </span>
      </div>


      { lists && lists.questions?
        lists.questions.map((section,index)=>{
          return(
            <div className="contentsections">
            <div style={{
              display:"flex",
              flexDirection:"row",
              justifyContent:"space-between",
              width:"100%"
              

           

            }}>
            <div
            style={{
              display:"flex",
              flexDirection:"row",
              justifyContent:"space-between",
              width:"40%"
              

           

            }}>
               <p>Question {index+1}</p>
            <p><span className="qestionstyle">Points </span>{section.point}</p>
            
            <p><span className="qestionstyle">Answer </span>{(section.answer).toUpperCase()}</p>

            </div>
         
            <IconButton  onClick={() => {     
                dispatch(DeleteQuestion(section._id));
                dispatch(getCourse(courseid)); 
          

              }}>
         <Trash size={15} color="black"/>
      
          </IconButton>
            </div>
            
              <h1><span className="qestionstyle">Question</span>  :{section.question}</h1>
              <p>Options</p>
              <div className="breaklinei"></div>
            
              <p><span className="qestionstyle">Option A :</span>{section.a}</p>
              <p><span className="qestionstyle">Option B :</span>{section.b}</p>
              <p><span className="qestionstyle">Option C :</span>{section.c}</p>
              <p><span className="qestionstyle">Option D:</span>{section.d}</p>
              <div className="breaklinei"></div>
            


           
            </div>
          );
        }):null }
      
       </div> : null}
    </div>


    )

})


:null

    }


 
    </div>
  
  );
};

export default CourseContent;
