import axios from "axios";
import * as notify from "./notification";

const {SUMMARY,FEEDRETURN,FEEDRETURNCLEAR, FEEDBACK,COMPLETEDQUIZES, API,COURSESP,COURSEBYID,MAIN_COURSE, CONTENTS, SECTIONS,COURSES ,ACCESSCONTROL,ALLCOUPONS} = require("../type");

export const Subject = (data) => ({
  type: MAIN_COURSE,
  payload: data,
});
export const coursebyid = (data) => ({
  type: COURSEBYID,
  payload: data,
});

export const Result = (data) => ({
  type: SUMMARY,
  payload: data,
});




export const completeq = (data) => ({
  type: COMPLETEDQUIZES,
  payload: data,
});



export  const controlv=(data) => ({
  type:ACCESSCONTROL ,
  payload:data
} 
  )
export const quiz_new = (data) => ({
  type: CONTENTS,
  payload: data,
});

export const section_new = (data) => ({
    type: SECTIONS,
    payload: data,
  });
  
  export const feedback = (data) => ({
    type: FEEDBACK,
    payload: data,
  });
  export const feedreturn = (data) => ({
    type: FEEDRETURN,
    payload: data,
  });
  export const feedreturnclear = () => ({
    type: FEEDRETURNCLEAR,
    payload: {},
  });

  export const Allsubject = (data) => ({
    type:COURSES,
    payload: data,
  });
  

  export const AllcourseP = (data) => ({
    type:COURSESP,
    payload: data,
  });



  export const Allcoupons = (data) => ({
    type:ALLCOUPONS,
    payload: data,
  });
  







axios.defaults.headers.post["Content-Type"] = "application/json";
axios.interceptors.request.use(config => {
  config.mode = "cors";
  return config;
});
export const AddSubjectServer = (data) => {
  return async (dispatch, getdispatch) => {
    try {
     
      const newd = await axios.post(`${API}/data/addsubject`, data);
    
      dispatch(
        Subject(newd.data)
      );
      dispatch(
        notify.notify_success({
          msg: `new Course Add !!`,
        }))
      
    } catch (error) {
      dispatch(
        notify.notify_error({
          msg: `failed !`,
        }))
    }
  };
};





export const startassessment = (data) => {
  return async (dispatch, getdispatch) => {
    try {
      const newd = await axios.post(`${API}/myassessment/createfeedback`, data);
    
      dispatch(
          feedback(newd.data)
      );


      dispatch(
          notify.notify_success({
            msg: `Start Quiz`,
          }))
    } catch (error) {
      dispatch(
        notify.notify_error({
          msg: `failed !`,
        }))
    }
  };
};

export const quiztaken =(data)=>{
  return async(dispatch)=>{
  try{

    const newd = await axios.post(`${API}/myassessment/checktakenassessment`, data);
    dispatch(
      Result(
        newd.data.summary
      ))
  }
  catch(error){
    
  }
  }
  
}
export const answerreturn = (data) => {
  return async (dispatch, getdispatch) => {
    try {
      const newd = await axios.post(`${API}/myassessment/answerreturn`, data);
    
      dispatch(
          feedreturn(newd.data.result)
      );
      dispatch(
        Result(
          newd.data.summary
        )
      )


      dispatch(
          notify.notify_success({
            msg: `Return`,
          }))
    } catch (error) {
      dispatch(
        notify.notify_error({
          msg: `Not submited !`,
        }))
    }
  };
};












export const answertry = (data) => {
  return async (dispatch, getdispatch) => {
    try {
      const newd = await axios.post(`${API}/myassessment/answertry`, data);
    
      dispatch(
          feedreturn(newd.data.result)
      );
      console.log()
      dispatch(Result(
        newd.data.summary
      ));

      dispatch(
          notify.notify_success({
            msg: `Return`,
          }))
    } catch (error) {
      dispatch(
        notify.notify_error({
          msg: `Not submited !`,
        }))
    }
  };
};


export const answerclear = () => {
  return async (dispatch,) => {
    try {
     
      dispatch(
          feedreturnclear()
      );
console.log("")

     
    } catch (error) {
     console.log()
    }
  };
};
export const addQuestion = (data) => {
    return async (dispatch, getdispatch) => {
      try {
        const newd = await axios.post(`${API}/myassessment/addquestion`, data);
      
        dispatch(
            section_new({section:newd.data})
        );
  

        dispatch(
            notify.notify_success({
              msg: `Add`,
            }))
      } catch (error) {
        dispatch(
          notify.notify_error({
            msg: `failed !`,
          }))
      }
    };
  };
 

  
export const addQuizes = (data) => {
    return async (dispatch, getdispatch) => {
      try {
        const newd = await axios.post(`${API}/myassessment/createquiz`, data);
      
        dispatch(
          quiz_new(newd.data)

        );
      
        dispatch(
            notify.notify_success({
              msg: `Add !`,
            }))
  
      } catch (error) {
        dispatch(
          notify.notify_error({
            msg: `failed !`,
          }))
      }
    };
  };
  

export const getQuize= (id) => {
  return async (dispatch, ) => {
    try {
      const newd = await axios.get(`${API}/data/getquiz/${id}`);
    
      dispatch(
        quiz_new(newd.data)

      );
    
     

    } catch (error) {
     console.log(error)
    }
  };
};






  export const DeleteSubject= (id) => {
    return async (dispatch, getdispatch) => {
      try {
      
      await axios.delete(`${API}/data/deletesubject/${id}`);
        dispatch(
            notify.notify_success({
              msg: `Subject removed !!`,
            }))

      } catch (error) {
        console.log(error.response.data);
        dispatch(
          notify.notify_error({
            msg: `failed !!`,
          }))
      }
    };
  };
  
  
  
  export const DeleteQuestion= (id) => {
    return async (dispatch, getdispatch) => {
      try {
      
      await axios.delete(`${API}/data/deletequestion/${id}`);
        dispatch(
            notify.notify_success({
              msg: `Question removed !!`,
            }))

      } catch (error) {
        console.log(error.response.data);
        dispatch(
          notify.notify_error({
            msg: `failed !!`,
          }))
      }
    };
  };
  
 
  

  export const DeleteQuiz= (id) => {
    return async (dispatch, getdispatch) => {
      try {
      
      await axios.delete(`${API}/data/deletequiz/${id}`);
        dispatch(
            notify.notify_success({
              msg: `Quiz removed !!`,
            }))

      } catch (error) {
        console.log(error.response.data);
        dispatch(
          notify.notify_error({
            msg: `failed !!`,
          }))
      }
    };
  };
  
 
  
    
  

    export const getCourses = () => {
      return async (dispatch, getdispatch) => {
        try {
          const newd = await axios.get(`${API}/data/getsubjects`);
          dispatch(
            Allsubject(newd.data)
          );
      
        } catch (error) {
        
        }
      };
    };



    export const CoursesClear = (data) => {
      return async (dispatch, getdispatch) => {
        try {

       
        dispatch(
          AllcourseP(null)
        );

        
        } catch (error) {
         
        }
      };
    };


    export const singleSubClear = (data) => {
      return async (dispatch, getdispatch) => {
        try {

       
        dispatch(
          Subject(null)
        );

        
        } catch (error) {
         
        }
      };
    };















    export const getCoursesP = (data) => {
      return async (dispatch, getdispatch) => {
        try {
     
          const newd = await axios.post(`${API}/data/getcoursespaginate`,data);
       

        let newdata=[...newd.data]; 
   
          const prevdata=getdispatch().coursesp
          if(prevdata){
            newdata=[...prevdata.AllcourseP,...newd.data];
  

        }
       
        dispatch(
          AllcourseP(newdata)
        );

        
        } catch (error) {
          console.log(error);
        }
      };
    };























  





       
 















    

    

    
    export const getCourse = (id) => {
      return async (dispatch, getdispatch) => {
        try {
          const newd = await axios.get(`${API}/data/getsubject/${id}`);
          
      dispatch(
        coursebyid(newd.data)

      );


        } catch (error) {
          console.log(error.response.data);
        }
      };
    };


    export const updateassessment = (id,value) => {
      return async (dispatch, getdispatch) => {
        try {
          const newd = await axios.patch(`${API}/data/modifyquiz/${id}`,value);
          
          dispatch(
            notify.notify_success({
              msg: `Updated!`,
            }))
  
      } catch (error) {
        dispatch(
          notify.notify_error({
            msg: `failed !`,
          }))
      }
      };
    };


    export const updatequestions = (id,value) => {
      return async (dispatch) => {
        try {
          const newd = await axios.patch(`${API}/data/modifyquestion/${id}`,value);
          
          dispatch(
            notify.notify_success({
              msg: `Updated!`,
            }))
  
      } catch (error) {
        dispatch(
          notify.notify_error({
            msg: `failed !`,
          }))
      }
      };
    };


    export const updateCourse = (id,data) => {
      return async (dispatch, getdispatch) => {
        try {
        
          const newd = await axios.patch(`${API}/data/modifycourse/${id}`,data);
          
      dispatch(
        coursebyid({course:newd.data})
      );



      dispatch(
        notify.notify_success({
          msg: `Updated !!`,
        }));

        } catch (error) {
          console.log(error.response.data);
        }
      };
    };
    export const clearCourse = (id) => {
      return async (dispatch, getdispatch) => {
        try {
    
          
      dispatch(
        coursebyid(null)

      );


        } catch (error) {
          console.log(error.response.data);
        }
      };
    };
    
  
    export const getreturnassessment = () => {
      return async (dispatch) => {
        try {
    console.log("Getting")
          const newd = await axios.get(`${API}/myassessment/getassessments`);
          console.log(newd.data)
        
    

                  
      dispatch(
        completeq(newd.data)
      );

    
    
       
        } catch (error) {
          console.log(error.response.data);
        }
      };
    };
    
  
  

 