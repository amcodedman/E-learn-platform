const express = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { User } = require("../models/users");
const { Admin } = require("../models/users");


exports.checkToken = async (req, res, next) => {
  try {
  
  
    let checker = req.cookies.authuser;
  

    if (checker) {
   
      const datas = jwt.verify(checker, process.env.DB_SECRET);
      console.log({user:datas})
      const user = await User.findOne({ _id: datas._id }).populate("subjects")
      .populate("quizes")
      .populate({ path: "quizes", populate: { path: "quiz" } })
      .populate("badges")
      
      ;
      if (user) {
      
       
        

          res.locals.userData = user;
        
          
       
      
      } else {
        console.log("No user found");
      }
      next();
    } else {
      next();
    }
  } catch (error) {
    res.status(401).send({ error: "bad token" });
    console.log(error);
  }
};

exports.Checkuser = async (req, res, next) => {

  const user = res.locals.userData;
  req.user = user;
  next();
};
