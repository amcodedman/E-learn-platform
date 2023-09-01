import React,{useEffect,useState} from "react";
import { useDispatch, useSelector } from "react-redux";

import { AutoLogin, getAllUsers } from "../../store/actions/adminActions";
import { useNavigate } from "react-router-dom";


const Authcontainer=(props)=>{

    const Checkuser = useSelector((item) => item.authuser);
    const navigate = useNavigate();

  

    useEffect(()=>{
        if(
      
          Checkuser && !Checkuser.auth){
            navigate("/")
          }
        
      })

    return(
<>


<div>
{props.children}


</div>

</>




    )
}


export default Authcontainer