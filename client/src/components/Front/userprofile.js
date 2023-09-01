import React, { useEffect, useState, useReducer } from "react";
import {
  Award,
  Badge3d,
  BadgeHdFill,
  BoxArrowDownLeft,
  BoxArrowDownRight,
  BoxArrowRight,
  Cast,
  CompassFill,
  Gem,
  Globe,
  Trophy,
} from "react-bootstrap-icons";

import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import TopNavLog from "../utils/signednav";
import { Signout, getAllUsers } from "../../store/actions/adminActions";
import LoaderView from "../utils/loaderView";

const UserDashbord = () => {
  const dispatch = useDispatch();

  const Students = useSelector((data) => data.students);
  const [allstudents, setstudent] = useState([]);

  useEffect(() => {
    if (Students && Students.data) {
      let arrays = Students.data;

      arrays.sort(function (a, b) {
        return b.totalpoints - a.totalpoints;
      });

      setstudent(arrays);
    }
  });

  const MyPosition = (id, data) => {
    const position = data.findIndex(function (item) {
      return item._id === id;
    });

    return position + 1;
  };

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const formattedDate = format(date, "EE LLL dd yyyy");
    return formattedDate;
  }
  const [TheDon, setdon] = useState([]);
  const [Pythagoras, setPythagoras] = useState([]);
  const [Intermediate, setIntermediate] = useState([]);
  const [Hypatia, setHypatia] = useState([]);
  const showbadge = (value) => {
    let badge = "";

    if (value === 100) {
      badge = "The Don";
    }
    if (value >= 90 && value < 100) {
      badge = "Pythagoras";
    }
    if (value >= 80 && value < 90) {
      badge = "Hypatia";
    }
    if (value < 80) {
      badge = "Intermediate";
    }

    return badge;
  };
  const awardpic = [
    "https://myportfoliocontent.s3.eu-north-1.amazonaws.com/ControllerImg/90badge.png25006.34633351777",
    "https://myportfoliocontent.s3.eu-north-1.amazonaws.com/ControllerImg/80badge.png65302.62036284919",
    "https://myportfoliocontent.s3.eu-north-1.amazonaws.com/ControllerImg/70badge.png19395.242191648522",
    "https://myportfoliocontent.s3.eu-north-1.amazonaws.com/ControllerImg/normalbadge.png11804.014851405742",
  ];
  const [loading, setloading] = useState(false);
  const Checkuser = useSelector((item) => item.authuser);

  const navigate = useNavigate();
  const [subjects, setsubjects] = useState([]);
  const [quizesreturn, setquizesreturn] = useState([]);
  const [identity, setidentity] = useState("");
  const [quizes, setquizes] = useState([]);
  const [allbadges, setbadges] = useState([]);

  useEffect(() => {
    if (Checkuser && Checkuser.account) {
      if (Checkuser.account.subjects) {
        if (Checkuser.account.subjects.length > 0) {
          setsubjects(Checkuser.account.subjects);
          setidentity(Checkuser.account._id);
        }
      }
      if (Checkuser.account.quizes) {
        if (Checkuser.account.quizes.length >= 0) {
          setquizesreturn(Checkuser.account.quizes);
        }
      }
      if (Checkuser.account.badges) {
        if (Checkuser.account.badges.length > 0) {
          setbadges(Checkuser.account.badges);
        }
      }
    }
  });

  useEffect(() => {
    if (allbadges.length > 0) {
      setdon(allbadges.filter((badge) => badge.name === "The Don"));
      setPythagoras(allbadges.filter((badge) => badge.name === "Pythagoras"));
      setHypatia(allbadges.filter((badge) => badge.name === "Hypatia"));
      setIntermediate(
        allbadges.filter((badge) => badge.name === "Intermediate")
      );
    }
  }, [allbadges, Hypatia, Intermediate, Pythagoras, TheDon]);
  const show = true;

  return (
    <>
      {Checkuser && Checkuser.auth ? (
        <div
          className="mainLayoutb"
          style={{
            minHeight: `${window.innerHeight}px`,
          }}
        >
          <div
            className="dashback"
            style={{
              minHeight: `${window.innerHeight}px`,
              backgroundImage:
                "url('https://myportfoliocontent.s3.eu-north-1.amazonaws.com/ControllerImg/stages.jpg24953.09997584616')",
            }}
          >
            <div
              className="dashcover"
              style={{
                minHeight: `${window.innerHeight}px`,
              }}
            >
              <TopNavLog show={show} />
              <div className="quiztodayh">
                <p> Subjects Taken</p>
              </div>
              <div className="quiztoday">
                {subjects && subjects.length > 0 ? (
                  subjects.map((data, index) => {
                    return (
                      <div key={index} className="quizreturn">
                        <p>{data.title}</p>
                      </div>
                    );
                  })
                ) : (
                  <p style={{ color: "aqua" }}>No Subjects taken as at now.</p>
                )}
              </div>

              <div className="quiztodayh">
                <p> Quizes Taken</p>
              </div>
              <div className="quiztoday">
                {quizesreturn && quizesreturn.length > 0 ? (
                  quizesreturn.map((data, index) => {
                    return (
                      <div key={index} className="quizreturn">
                        <p>
                          {data.quiz && data.quiz.title ? data.quiz.title : ""}
                        </p>
                      </div>
                    );
                  })
                ) : (
                  <p style={{ color: "aqua" }}>
                    {quizes.length}
                    No Quizes taken as at now.
                  </p>
                )}
              </div>

              <div className="quiztodaybadgeh">
                <p> Badges and Rewards</p>
              </div>
              <div className="quizereward">
                <>
                  {TheDon && TheDon.length > 0 ? (
                    <div className="rewardslayout">
                      <img className="badgeimg" alt="" src={awardpic[0]} />
                      <p>The Don</p>
                      <span>X {TheDon.length}</span>
                    </div>
                  ) : null}
                </>

                <>
                  {Pythagoras.length > 0 ? (
                    <div className="rewardslayout">
                      <img className="badgeimg" alt="" src={awardpic[1]} />
                      <p>Pythagoras</p>
                      <span>X {Pythagoras.length}</span>
                    </div>
                  ) : null}
                </>

                <>
                  {Hypatia.length > 0 ? (
                    <div className="rewardslayout">
                      <img className="badgeimg" alt="" src={awardpic[2]} />
                      <p>Hypatia</p>
                      <span>X {Hypatia.length}</span>
                    </div>
                  ) : null}
                </>
                <>
                  {Intermediate.length > 0 ? (
                    <div className="rewardslayout">
                      <img className="badgeimg" alt="" src={awardpic[3]} />
                      <p>Intermediate</p>
                      <span>X {Intermediate.length}</span>
                    </div>
                  ) : null}
                </>
              </div>
              <div className="groweffect"></div>
              <div className="quizP">
                <p>
                  <span className="quizPspan">
                    <Globe color="yellow" size={30} />{" "}
                  </span>
                </p>
                <p>
                  {" "}
                  Global Position
                  <span className="quizPspan">
                    {MyPosition(identity, allstudents)}
                  </span>
                </p>
              </div>

              <div className="quiztodayha">
                <p>
                  Activities board Board{" "}
                  <span style={{ marginLeft: "10px" }}>
                    {" "}
                    <Trophy color="white" />
                  </span>
                </p>
              </div>
              <div className="leadersboardview">
                <div className="tablelayoutd">
                  <div className="table_headerd">
                    <div className="headerlayout_n">Quizes taken</div>
                    <div className="headerlayout">Score</div>

                    <div className="headerlayout">Points</div>
                    <div className="headerlayout">Badge</div>
                    <div className="headerlayout_n">Date</div>
                  </div>
                  {quizesreturn && quizesreturn.length > 0
                    ? quizesreturn.map((data, index) => {
                        return (
                          <div key={index} className="table_headerdt">
                            <div className="headerlayout_n fontdetails">
                              {data && data.quiz ? data.quiz.title : ""}
                            </div>
                            <div className="headerlayout fontdetails">
                              {data.score_rate.toFixed(1)} %
                            </div>

                            <div className="headerlayout fontdetails">
                              {data.total_score}
                            </div>
                            <div className="headerlayout fontdetails">
                              {showbadge(data.score_rate)}
                            </div>
                            <div className="headerlayout_n">
                              {data && data.createdAt
                                ? formatDate(data.createdAt)
                                : "...."}
                            </div>
                          </div>
                        );
                      })
                    : null}
                </div>
              </div>
              <span
                className="SignOutbtn"
                onClick={() => {
                  dispatch(Signout());
                }}
              >
                Sign out
              </span>
            </div>
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

export default UserDashbord;
