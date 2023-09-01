import React, { useEffect, useState, useReducer } from "react";
import { Award, Badge3d, BoxArrowDownLeft, BoxArrowDownRight, BoxArrowRight, Cast, CompassFill } from "react-bootstrap-icons";
import {useSelector } from "react-redux"
import {useNavigate} from "react-router-dom"
import TopNav from "../utils/pagenav";

const Home = () => {
  const [loading, setloading] = useState(false);
  const Checkuser = useSelector((item) => item.authuser);
const navigate=useNavigate()
useEffect(()=>{
  if(

    Checkuser && Checkuser.auth){
      navigate("/home/dashboard")
    }
  
})

  return (
    <div
      className="mainLayoutb"
      style={{
        minHeight: `${window.innerHeight}px`,
        }}
    >
   <TopNav/>
      <div className="mainLayoutcover">
 
     
     
        <div className="transp">



        <div className="landingpage">

       
        <div className="leftland">
        <h1>
          Easy and intuitive way to learn and level up
        </h1>
        <p>
        Practice makes perfect, and Mathic
                offers an extensive collection of math quizzes from algebra to
                geometry, calculus to statistics, we've got you covered with
                comprehensive exercises that will sharpen your mathematical
                prowes.📚
        </p>

        </div>
        <div className="rightland">
        <img 
        className="homeimage"
        

        alt="" src="https://myportfoliocontent.s3.eu-north-1.amazonaws.com/ControllerImg/learingaa.png13233.062015265084"></img>

        </div>
        <div className="signpage desktopNav "  >
        <div className="signland land1">
        <span>

        <BoxArrowRight color="black" size={30}/>
        </span>
  
      
        <p>
        Embark on your math adventure by signing up with Mathic learning Platform. Our user-friendly registration process ensures that you're just a few clicks away from accessing a world of mathematical exploration.Simply create your account, and you're ready to unlock a treasure trove of math quizzes and challenges.
        </p>

        </div>
        <div className="signland land2">
        <span>
        <CompassFill color="black" size={30}/>
</span>
        
        <p>
        Navigate through a wide array of available subjects, each designed to challenge and stimulate your mathematical prowess. From algebraic equations that tickle your logical thinking to geometric puzzles that enhance your spatial reasoning, MathicLearn's quizzes are carefully curated to broaden your horizons. Every quiz you tackle is a stepping stone toward a deeper understanding of mathematical concepts
        </p>
       
        </div>
        <div className="signland land3">
        <span>
        <Award color="black" size={30}/>

</span>
     
       <p>
       As you conquer quizzes, you'll earn badges that showcase your achievements and milestones. Collect them as tokens of your dedication and progress along your math journey. But that's not all – MathicLearn turns learning into a friendly competition. Climb up the rankings as you accumulate points and showcase your skills. 
       </p>
        </div>


        </div>


        </div>



        <div className="signpage mobile">
        <div className="signland land1">
        <span>

        <BoxArrowRight color="black" size={30}/>
        </span>
  
      
        <p>
        Embark on your math adventure by signing up with Mathic learning Platform. Our user-friendly registration process ensures that you're just a few clicks away from accessing a world of mathematical exploration.Simply create your account, and you're ready to unlock a treasure trove of math quizzes and challenges.
        </p>

        </div>
        <div className="signland land2">
        <span>
        <CompassFill color="black" size={30}/>
</span>
        <CompassFill color="black" size={30}/>
        <p>
        Navigate through a wide array of available subjects, each designed to challenge and stimulate your mathematical prowess. From algebraic equations that tickle your logical thinking to geometric puzzles that enhance your spatial reasoning, MathicLearn's quizzes are carefully curated to broaden your horizons. Every quiz you tackle is a stepping stone toward a deeper understanding of mathematical concepts
        </p>
       
        </div>
        <div className="signland land3">
        <span>
        <Award color="black" size={30}/>

</span>
     
       <p>
       As you conquer quizzes, you'll earn badges that showcase your achievements and milestones. Collect them as tokens of your dedication and progress along your math journey. But that's not all – MathicLearn turns learning into a friendly competition. Climb up the rankings as you accumulate points and showcase your skills. 
       </p>
        </div>


        </div>
      
          <div></div>
        </div>
      </div>

      <div className="footer">
        <div className="frontitemhover">
          <p>
          Powered by Badu Tech.
            All rights reserved
            <span style={{ color: "green" }}> @ </span> 2023
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
