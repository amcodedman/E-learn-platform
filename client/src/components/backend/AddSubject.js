import { TextField } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector,useDispatch } from 'react-redux';
import { PushSpinner } from 'react-spinners-kit';
import * as Yup from "yup";
import { AddSubjectServer, getCourses } from '../../store/actions/datacollection';
import AddQuiz from './AddContent';

const AddSubject=()=>{
    const [loadingbtn, setloadbtn] = useState(false);
    
const dispatch=useDispatch();
const newSubject=useSelector((value)=>value.newSubject)
const [getnewSubject,setnewfield]=useState(false);
const [courseid,setcourseid]=useState(null)
const [coursename,setcoursename]=useState();
useEffect(()=>{
 
 if(newSubject && newSubject.data){

 
    setcourseid(newSubject.data._id);
  
 
  setnewfield(true)

 } else{
setnewfield(false)


 }
},[dispatch,newSubject])




useEffect(()=>{
  dispatch(getCourses());
},[dispatch])
    const Formik = useFormik({
        initialValues: {
          title: "",
          maincategory: "",
          subcategory: "",
          price: "",
          detail:"",
          file: "",
          abstract: "",
          expections:""
        },
    
        enableReinitialize: true,
        validationSchema: Yup.object({
         title: Yup.string().required("field required"),
       
         
         detail: Yup.string().required("field required"),
       
  
     
        
        }),
        onSubmit: (value) => {
          setloadbtn(true);
        dispatch(
          AddSubjectServer(value))
    
        },
      });


      const notifications = useSelector((value) => value.notification);
      useEffect(() => {
        if (notifications && notifications.notice) {
          setloadbtn(false);
        }
      });
    return(
        <div className="profile_box_m_admin">
        <div className="profile_header">
          <h1>Create new Subject</h1>
          
        </div>

        {

  getnewSubject ?

  <div>
<p>

</p>
<AddQuiz  id={courseid}  setnewfield={setnewfield} course={newSubject && newSubject.data ? newSubject.data.title :null}/>


  </div>


:
  
        <div className="update_form">
          <form onSubmit={Formik.handleSubmit} className="myformadmin">
         



          <TextField
                      className="textfields"
              style={{ margin: "10px 10px 10px 0", color: "red" }}
              name="title"
              label="Subject"
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
                      className="textfields"
              style={{ margin: "10px 10px 10px 0" }}
              name="file"
              value={Formik.values.file}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              error={
                Formik.touched.file && Boolean(Formik.errors.file)
              }
              helperText={Formik.touched.file && Formik.errors.file}
              {...Formik.getFieldHelpers("file")}
              label="Image url"
            ></TextField>

         

            <TextField
                      className="textfields"
              style={{ margin: "10px 10px 10px 0"  }}
              name="detail"
              multiline
      rows={10}
              value={Formik.values.detail}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              error={
                Formik.touched.detail && Boolean(Formik.errors.detail)
              }
              helperText={Formik.touched.detail && Formik.errors.detail}
              {...Formik.getFieldHelpers("detail")}
              label="Course Description"
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
              Add Subject
              </Button>
            )}
          </form>
        </div>
     
      }
      </div>
    )
}


export default AddSubject