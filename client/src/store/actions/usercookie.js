import cookie from "react-cookies";

import { GeoActive } from "./../type";
import axios from "axios";
axios.interceptors.request.use(config => {
  config.mode = "cors";
  return config;
});
export const GetGeoCookie =  () =>  cookie.load("geo");
export const Getusercookie =  () =>  cookie.load("authuser");
export let Axiosinstance=()=>axios.create({
 headers:{
  "authuser":Getusercookie()
 } 
})


export const Gcookie = (data) => ({
  type: GeoActive,
  payload: data,
});

export const GeoActiveD = () => {
  return async (dispatch) => {
    try {
      
      const t= await GetGeoCookie()
    
      const userLocation = await axios.post("/ipaddress/cookieverify", {
        token: t
      });

      dispatch(Gcookie(userLocation.data));
      console.log(userLocation.data);
    } catch (error) {
      console.log(error);
    }
  };
};

export const GeoCookieT = () => {
  return async (dispatch) => {
    try {
      await axios.post("/ipaddress/cookieip");
    } catch (error) {
      console.log(error);
    }
  };
};
