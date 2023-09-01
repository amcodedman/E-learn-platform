import React, { useEffect, useState, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoaderView from "../utils/loaderView";
import {
  answerclear,
  answerreturn,
  answertry,
  getCourses,
  getQuize,
  quiztaken,
  startassessment,
} from "../../store/actions/datacollection";
import { useNavigate, useParams } from "react-router-dom";
import { PushSpinner } from "react-spinners-kit";
import { Check, XLg } from "react-bootstrap-icons";
import TopNavLog from "../utils/signednav";

const TryQuizes = () => {
  const { id } = useParams();
  const { duration } = useParams();
  const { name } = useParams();
  const { subject } = useParams();
  const fname = decodeURIComponent(name);


  const [getduration, setduration] = useState(30);

  const targetDuration = duration * 60; // 80 minutes in seconds

  const storedData = localStorage.getItem(
    `duration${id}`
  );
  if (!storedData) {
    localStorage.setItem(
      `duration${id}`,
      targetDuration
    );
  }

  let targetDurat = JSON.parse(storedData);
  console.log(targetDurat);
  const [timeLeft, setTimeLeft] = useState(targetDuration);
  const updateDuration = (time) => {
    localStorage.setItem(
      `duration${id}`,
      timeLeft - 1
    );
  };
  useEffect(() => {
    const storedData = localStorage.getItem(
      `duration${id}`
    );
    if (storedData) {
      console.log(storedData);
      setTimeLeft(JSON.parse(storedData));
    }
  }, []);
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
      updateDuration(timeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secondsLeft = seconds % 60;

    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${
      secondsLeft < 10 ? "0" : ""
    }${secondsLeft}`;
  };

  const dispatch = useDispatch();

  const [loadingbtn, setloadbtn] = useState(false);

  const [getindex, setindex] = useState(1);

  const [getidd, setindd] = useState(false);

  // Load data from localStorage on component mount
  useEffect(() => {
  

        const storedData = localStorage.getItem(
          `questionn${id}`
        );
        if (storedData) {
          setindex(JSON.parse(storedData));
        }

        setindd(true);
      
      
    
  },[]);

  // Function to update and store data
  const updateData = (question) => {
    localStorage.setItem(
      `questionn${id}`,
      question
    );
  
  
  };

  const notifications = useSelector((value) => value.notification);
  const summary = useSelector((value) => value.summary);

  const [showresults, setresult] = useState("");
  const [showprompt, setprompt] = useState("");

  useEffect(() => {
    if (notifications && notifications.notice) {
      setloadbtn(false);
    }
  });


  
  useEffect(() => {
    if (summary && summary.data && summary.data.status) {
      localStorage.setItem(
        `questionn${id}`,
        1
      );
    }
  });

  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [choose, setpick] = useState("");
  const [status, setstatus] = useState(null);
  const [showresult, setdisplay] = useState(false);
  const [correctanswer, setanswer] = useState("");

  const [questions, setquestion] = useState([]);

  const quizes = useSelector((value) => value.newQuiz);
  const feedback = useSelector((value) => value.feedback);
  const feedreturn = useSelector((value) => value.feedreturn);
  let nextstatus = true;

  useEffect(() => {
    if (feedreturn && feedreturn.data) {
      setstatus(feedreturn.data.status);
      setdisplay(true);
      setanswer(feedreturn.data.answer);
    } else {
      setstatus(null);
      setdisplay(false);
      setanswer("");
    }
  });
  const SubmitAnswer = () => {
    setloadbtn(true);
    dispatch(answertry(
      {
      "quiz_id":id,
        "quizename":fname,
      "choose":choose,
      "question": questions[getindex-1].question,
      "question_id":questions[getindex-1]._id,
      "complete":getindex===questions.length,
      "subjectid":subject,
      "next": getindex===questions.length  ? false :true
      }
     
  ));
  updateData(getindex + 1);
  };
useEffect(()=>{
  if(timeLeft===0){
    dispatch(answertry(
      {
      "quiz_id":id,
        "quizename":fname,
      "choose":choose,
      "question": questions[getindex-1].question,
      "question_id":questions[getindex-1]._id,
      "complete":getindex===questions.length,
      
      "subjectid":subject,
      "next": getindex===questions.length  ? false :true
      }
     
  ))
  }
})
  useEffect(() => {
    if (quizes && quizes.data) {
      setquestion(quizes.data.questions);
    }
  }, [quizes, questions]);
  useEffect(() => {
    dispatch(getQuize(id));
  }, [dispatch]);

  const show = false;
 
  const showbadge = (value) => {
    let badge = "";

    if (value === 100) {
      badge = awardpic[0];
    }
    if (value >= 90 && value < 100) {
      badge = awardpic[1];
    }
    if (value >= 80 && value < 90) {
      badge = awardpic[2];
    }
    if (value >= 70 && value < 80) {
      badge = awardpic[3];
    }
    if (value < 70) {
      badge =
        "https://myportfoliocontent.s3.eu-north-1.amazonaws.com/ControllerImg/questionn.png25331.689162174185";
    }

    return badge;
  };
  const awardpic = [
    "https://myportfoliocontent.s3.eu-north-1.amazonaws.com/ControllerImg/90badge.png25006.34633351777",
    "https://myportfoliocontent.s3.eu-north-1.amazonaws.com/ControllerImg/80badge.png65302.62036284919",
    "https://myportfoliocontent.s3.eu-north-1.amazonaws.com/ControllerImg/70badge.png19395.242191648522",
    "https://myportfoliocontent.s3.eu-north-1.amazonaws.com/ControllerImg/normalbadge.png11804.014851405742",
  ];
  return (
    <>
      {quizes && quizes.data ? (
        <div
          className="mainLayout bodyquiz"
          style={{
            minHeight: `${window.innerHeight}px`,
          }}
        >
          <div className="mainLayoutc">
            <TopNavLog show={show} />
          
              <>
                {summary && summary.data && summary.data.status ? (
                  <div className="assesslayout">
                    <div className="assesslayoutresult">
                      <p>
                        {" "}
                        <span style={{ color: "aqua" }}>Quiz Results</span>{" "}
                      </p>
                      <p>
                        Earned {summary.data.score} points out of{" "}
                        {summary.data.totalpoint}
                      </p>
                      <p>
                        Average Score
                        {summary.data.averages.toFixed(2)} %
                      </p>
                      <p>
                        Badge Earned 
                        <span style={{ color: "aqua",paddingLeft:"5px" }}>
                          {summary.data.badge}
                        </span>
                      </p>
                      <img
                        alt=""
                        src={`${showbadge(summary.data.averages)}`}
                        className="badgeimgm"
                      />
                      <span
                        className="backpbtn"
                        onClick={() => {
                          navigate("/user/Signup");
                        }}
                      >
                        Join now
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="assesslayout">
                    {questions.length > 0 ? (
                      <div className="assesslayoutquestion">
                        <div className="assesslayoutquestionh">
                          <p>Question {getindex}</p>

                          <p>
                            <span style={{ color: "yellow" }}>Time Left:</span>{" "}
                            {formatTime(timeLeft)}{" "}
                          </p>
                        </div>
                        <h1>{questions[getindex - 1].question}</h1>
                        <fieldset>
                          <div className="divoption">
                            <input
                              onClick={() => setpick("a")}
                              type="radio"
                              id={questions[getindex - 1].a}
                              name="Option"
                              value="a"
                            />
                            <label for="a">
                              {" "}
                              A . {questions[getindex - 1].a}
                            </label>
                            {showresult && correctanswer === "a" ? (
                              <span>
                                <Check size={20} color="yellow" />
                              </span>
                            ) : null}

                            {showresult &&
                            choose === "a" &&
                            status === false ? (
                              <span>
                                <XLg size={20} color="red" />
                              </span>
                            ) : null}
                          </div>

                          <div className="divoption">
                            <input
                              onClick={() => setpick("b")}
                              type="radio"
                              id={questions[getindex - 1].b}
                              name="Option"
                              value="b"
                            />
                            <label for="b">
                              B . {questions[getindex - 1].b}
                            </label>
                            {showresult && correctanswer === "b" ? (
                              <span>
                                <Check size={20} color="yellow" />
                              </span>
                            ) : null}

                            {showresult &&
                            choose === "b" &&
                            status === false ? (
                              <span>
                                <XLg size={20} color="red" />
                              </span>
                            ) : null}
                          </div>

                          <div className="divoption">
                            <input
                              onClick={() => setpick("c")}
                              type="radio"
                              id={questions[getindex - 1].c}
                              name="Option"
                              value="c"
                            />
                            <label for="c">
                              {" "}
                              C. {questions[getindex - 1].c}
                            </label>
                            {showresult && correctanswer === "c" ? (
                              <span>
                                <Check size={20} color="yellow" />
                              </span>
                            ) : null}

                            {showresult &&
                            choose === "c" &&
                            status === false ? (
                              <span>
                                <XLg size={20} color="red" />
                              </span>
                            ) : null}
                          </div>

                          <div className="divoption">
                            <input
                              onClick={() => setpick("d")}
                              type="radio"
                              id={questions[getindex - 1].d}
                              name="Option"
                              value="d"
                            />
                            <label for="d">
                              {" "}
                              D. {questions[getindex - 1].d}
                            </label>
                            {showresult && correctanswer === "d" ? (
                              <span>
                                <Check size={20} color="yellow" />
                              </span>
                            ) : null}

                            {showresult &&
                            choose === "d" &&
                            status === false ? (
                              <span>
                                <XLg size={20} color="red" />
                              </span>
                            ) : null}
                          </div>
                        </fieldset>

                        <div className="rowlayout">
                          <>
                            {showresult ? (
                              <>
                                {getindex === questions.length ? null : (
                                  <span
                                    onClick={() => {
                                      dispatch(answerclear());
                                      setindex(getindex + 1);
                                      
                                 
                                    }}
                                    className="nextbtn"
                                  >
                                    Next Question
                                  </span>
                                )}
                              </>
                            ) : (
                              <>
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
                                  <span
                                    className="nextbtn"
                                    onClick={() => SubmitAnswer()}
                                  >
                                    Submit
                                  </span>
                                )}
                              </>
                            )}
                          </>
                          {}

                          <span>
                            {getindex}/{questions.length}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div>No Questions available for this quiz</div>
                    )}
                  </div>
                )}
              </>
          
          </div>

          <div className="footer">
            <div className="frontitemhover">
              <p>
                Powered by BaduTech All rights reserved
                <span style={{ color: "green" }}> @ </span> 2023
              </p>
            </div>
          </div>
        </div>
      ) : (
        <LoaderView />
      )}
    </>
  );
};

export default TryQuizes;
