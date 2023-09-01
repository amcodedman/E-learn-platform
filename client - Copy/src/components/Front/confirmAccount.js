import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";

import { CheckCircle } from "react-bootstrap-icons";
import { CircleSpinner } from "react-spinners-kit";
import { ComfirmUserS } from "../../store/actions/adminActions";

const ConfirmAccount = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("t");
  const dispatch = useDispatch();
  const notifications = useSelector((value) => value.notification);
  const [loading, setload] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (notifications && notifications.notice) {
      if (notifications.success) {
          setload(false);
        navigate("/");
      }
    }
  });
 
  const Comfirmme = () => {
    setload(true);
    dispatch(ComfirmUserS({ t: token }));
  };

  return (
    <div
      className="mainLayoutb "
      style={{ minHeight: `${window.innerHeight}px` }}
    >

<div className="sitenamenormal">
        <div className="companyn">
            {" "}
            <img
              style={{ width: "50px", height: "50px" }}
              alt=""
              src="https://myportfoliocontent.s3.eu-north-1.amazonaws.com/ControllerImg/math_61.png57345.512299217786"
            />{" "}
            <p style={{ color: "white", marginLeft: "10px" }}>Mathic</p>
          </div>
        </div>



      <p className="verifypage">
        Please click on{" "}
        <span style={{ fontFamily: "Roboto condensed", color: "aqua",fontSize:"14px" }}>Verify me</span>{" "}
        to complete process
      </p>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          
        }}
      >
        {loading ? (
          <CircleSpinner color="blue" />
        ) : (

          <span
            onClick={() => {
              Comfirmme();
            }}
            className="verifyme"
          >
            <CheckCircle /> Verify me
          </span>
        )}
      </div>
      <div className="footer">
        <div className="frontitemhover">
          <p>
             Powered by Badu Tech. All rights reserved<span style={{ color: "green" }}> @ </span>{" "}
            2023
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmAccount;
