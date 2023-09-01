import { TextField } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector,useDispatch } from 'react-redux';
import { PushSpinner } from 'react-spinners-kit';
import * as Yup from "yup";
import { AddSubjectServer, addQuizes, getCourse, getCourses } from '../../store/actions/datacollection';
import CourseContent from './contents_sections';
import CreateSections from '../utils/createsection';

const AddQuiz=(props)=>{
    const [loadingbtn, setloadbtn] = useState(false);
    
const dispatch=useDispatch();
const newSubject=useSelector((value)=>value.newSubject)
const singleSubject=useSelector((value)=>value.singleSubject)

const newcont=useSelector((value)=>value.newQuiz)
const [contentsid,setcontentid]=useState("")
const [courseid,setcourseid]=useState("")
const [getnewSubject,setnewfield]=useState(false);



useEffect(()=>{
  if(singleSubject && singleSubject.data){
    if( singleSubject.data.quizes.length >0){
      setaction(true)

    }
  }
})
useEffect(()=>{
 if(newSubject && newSubject.data){
 
    setcourseid(newSubject.data._id);


 } else{
props.setnewfield(false)
 }
})




useEffect(()=>{
  dispatch(getCourses());
},[dispatch])




useEffect(()=>{
  dispatch(getCourse(props.id));

})



const Formik = useFormik({
        initialValues: {
          title: "",
          subject:`${props.id}`,
          detail: "",
          duration:""
      
        },
    
        enableReinitialize: true,
        validationSchema: Yup.object({
         title: Yup.string().required("field required"),
         detail: Yup.string().required("field required"),
         duration: Yup.string().required("field required"),
      
        
        }),
        onSubmit: (value) => {
      
          setloadbtn(true);
       dispatch(addQuizes(value))
       dispatch(getCourse(props.id));
    
        },
      });


      const notifications = useSelector((value) => value.notification);

      useEffect(() => {
        if (notifications && notifications.notice) {
          setloadbtn(false);
        }
      });
      const [edith,setedith]=useState(false)
      const [showquizcontent,setaction]=useState(false)
    return(
        <div className="profile_box_m_admin">
         <div><p>{props.course} Assessment</p></div> 


         {
          showquizcontent ?
          <CourseContent changefield={setedith}  edith={edith} newSubject={newSubject} courseid={props.id}  setcontentid={setcontentid}/>  

      :null

         }
      
   
  
        <div className="update_formscontent">
   {edith ? 
    <CreateSections  id={contentsid} mainid={props.id}/>:
    <form onSubmit={Formik.handleSubmit} className="myformadmin">
        
          <TextField
                    
              style={{ margin: "10px 10px 10px 0", color: "red" }}
              name="title"
              label="new Assessment"
              {...Formik.getFieldHelpers("title")}
              value={Formik.values.title}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              error={
                Formik.touched.title &&
                Boolean(Formik.errors.title)
              }
              helperText={
                Formik.touched.title && Formik.errors.title
              }
            ></TextField>

   
            <TextField
                  
              multiline
      rows={6}

              style={{ margin: "10px 10px 10px 0" }}
              name="detail"
              value={Formik.values.detail}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              {...Formik.getFieldHelpers("detail")}
              error={
                Formik.touched.detail && Boolean(Formik.errors.detail)
              }
              helperText={Formik.touched.detail && Formik.errors.detail}
              label="Assessment Description"
            ></TextField>


<TextField
      

              style={{ margin: "10px 10px 10px 0" }}
              name="duration"
              value={Formik.values.duration}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              {...Formik.getFieldHelpers("duration")}
              error={
                Formik.touched.duration && Boolean(Formik.errors.duration)
              }
              helperText={Formik.touched.duration && Formik.errors.duration}
              label="Duration"
            ></TextField>
         

            {loadingbtn ? (
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "5px",
                }}
              >
                <PushSpinner color="aqua" size={17} />
              </div>
            ) : (
              <Button
                type="submit"
                style={{
                  marginBottom: "50px",
                  width: "25%",
                  minWidth: "98%",
                }}
              >
                Update Details
              </Button>
            )}
          </form>


   }

          
      
        </div>
    
      </div>
    )
}


export default AddQuiz