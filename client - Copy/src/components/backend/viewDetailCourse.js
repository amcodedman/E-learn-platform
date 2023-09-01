import React, { useEffect, useState } from "react";
import { RawToHtml } from "../utils/rawtohtml";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { DeleteSubject, getCourses ,getCourse, DeleteSection, DeleteContent, clearCourse,updateCourse, DeleteQuiz, DeleteQuestion} from "../../store/actions/datacollection";
import { PushSpinner } from "react-spinners-kit";
import AOS from 'aos';
import 'aos/dist/aos.css';

import { useNavigate, useParams,} from "react-router-dom";
import LoaderView from "../utils/loaderView"
import AddContentReuse from "../addcontentreuse";
import { Arrow90degLeft, ArrowDownShort, ArrowUpShort,PencilSquare,Trash } from "react-bootstrap-icons";
import AddSectionsResuse from "../utils/reuseasddsection";
import UpdateCourse from "../utils/rupdatecourse";
import UpdateQuestion from "../utils/updatequestion";


const CourseDetail = () => {
    const subjects = useSelector((value) => value.singleSubject);
    const [mycourse,setcourse]=useState(null);
    const [myassessment,setassessment]=useState(null);
    const [myqestion,setquestion]=useState(null);
    const [action,setaction]=useState(null);
    const [contentheader,setheader]=useState(null);
    const [contentid,setcontentid]=useState(null);
    const {id}=useParams()
  

    const navigate=useNavigate();

  const [loadingbtn, setloadbtn] = useState(false);
  const [ content_id, setcontent_id]=useState(null);
  const [showsection,setshow]=useState(false);

  const notifications = useSelector((value) => value.notification);
  useEffect(() => {
    if (notifications && notifications.notice) {
      setloadbtn(false);
    }
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCourse(id));
   
  });


  useEffect(()=>{
   if(subjects && subjects.data){
    setcourse(subjects.data);

   }
  })
 


  const Displayeditor=()=>{
    if(action==="newcontent"){
        return( 
            <AddContentReuse id={id}/>
        )
    }
    if(action==="newsection"){
      return(
        <
        AddSectionsResuse id={contentid}  subjectid={id}  header={contentheader}/>

      )
   


    }
    if(action==="updateassessment"){
      return(
        <
        UpdateCourse id={mycourse ? mycourse._id :""}   course={myassessment}/>

      )
   

    }
    if(action==="updatequestion"){
      return(
        <
        UpdateQuestion  subjectid={id} question={myqestion}/>

      )
   

    }
  }


  return (
    <>
    {
        mycourse ?


        <div
      className="profile_box_m_page"
      style={{ minHeight: `${window.innerHeight}px` }}
    >
    
    <div  className="backlayout">
    
    <IconButton  
      
      onClick={()=>{
        navigate("/mainadmin/assessment")
        
      }}>  
      
      <Arrow90degLeft size={14} color="aqua"/>
      </IconButton>

      <span
      onClick={()=>{
        dispatch(clearCourse());
      }}>Back</span>

    </div>


      {mycourse ? 

        <div className=" courselabel">
        <p>Title</p>
              <div className="coursecontrol">
            
                <p className="courseheader">{mycourse.title}</p>{" "}
                <div className="btnss">
                 

                  {loadingbtn ? (

                <PushSpinner size={8} />
                   
                  ) : (
                    <IconButton
                     
                      onClick={() => {
                        dispatch(DeleteSubject());

                        setloadbtn(true);
                        dispatch(getCourses());
                      }}
                    >
                      <Trash/>
                    </IconButton>
                  )}


                  <span className="btnlabel"
                        onClick={()=>{
                    setaction("newcontent");
                    setTimeout(()=>{
                      document.getElementById("editorspace").scrollIntoView({behavior:"smooth"});

                    },500)
                   
                  }}
                  
                   >new Assessments</span>
                 
              
              
                </div>{" "}
              </div>


              <div>

           
                <p className="plabel">About Subject</p>
                <p>{mycourse.detail}</p>
              </div>
         

              <div className="contents_layout">
                <span className="contentslabel">Subject Assessment</span>
                {mycourse.quizes.length > 0
                  ? mycourse.quizes.map((contents, ids) => {
                      return (
                        <div key={ids} className="contents_box">
                        <div className="coursecontrol">
                        <p>Quiz {ids+1}</p>
                      
                       <div>
                       <span className="btnlabel"
                       onClick={()=>{
                        setheader(contents.title)
                        setcontentid(contents._id)
                        setaction("newsection");
                    setTimeout(()=>{
                      document.getElementById("editorspace").scrollIntoView({behavior:"smooth"});

                    },500)
                        
                       }}
                       
                       
                       
                       >Add Question</span>
                       <span   className="btnlabel"

                       onClick={()=>{

                        setassessment(contents)
                        setaction("updateassessment");
                        setcontentid(contents._id);
                        setTimeout(()=>{
                      document.getElementById("editorspace").scrollIntoView({behavior:"smooth"});

                    },500)
                        
                       }}
                       >Modify</span>
                        <span
                        onClick={()=>{
                          dispatch(DeleteQuiz(contents._id))
                        }}
                         className="btnlabel_delete">Delete Quiz </span>
                       </div>
                        </div>
                        <p>{contents.title}</p>
                        <p>Duration : {contents.duration}</p>
                       
                 
                        
                          
                          <div>
                          {
                            showsection && content_id===contents._id ?
                            <span 
                               onClick={()=>{
                            
                              setshow(false)
                              
                            }}
                            className="contentslabel_s">
                             Close <ArrowUpShort/>
                            </span>
                        
                          :

                          <span
                            onClick={()=>{
                              setcontent_id(contents._id);
                              setshow(true)
                              
                            }}
                             className="contentslabel">
                             Show Questions <ArrowDownShort/>
                            </span>
                           

                          }
                            

{
  showsection && content_id===contents._id ?
<>

{contents.questions.length > 0
                              ? contents.questions.map(
                                  (section, sectionindex) => {
                                    return (
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
               <p>Question {sectionindex+1}</p>
            <p><span className="qestionstyle">Points </span>{section.point}</p>
            
            <p><span className="qestionstyle">Answer </span>{(section.answer).toUpperCase()}</p>

            </div>
         
         <div>
         
         <IconButton  onClick={() => {  

          setquestion(section)   
          
          
             setaction("updatequestion");
                       
                        setTimeout(()=>{
                      document.getElementById("editorspace").scrollIntoView({behavior:"smooth"});

                    },500)

              }}>
         <PencilSquare size={15} color="black"/>
      
          </IconButton>

         <IconButton  onClick={() => {     
                dispatch(DeleteQuestion(section._id));
          
          

              }}>
         <Trash size={15} color="black"/>
      
          </IconButton>
         </div>
          
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
                                  }
                                )
                              : null}
</>
:null
  
}
                          </div>
                        </div>
                      );
                    })
                  : null}
              </div>

<div>


</div>

            </div>
       : (
        <div>
          <p>No courses</p>
        </div>
      )}


    <div >{ Displayeditor()}</div> 

     
      <div id="editorspace"></div>
    
   
    </div>
    :
    <LoaderView/>



    }
    </>
  );
};
export default CourseDetail;
