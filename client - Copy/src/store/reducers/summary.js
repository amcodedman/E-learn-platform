import {  SUMMARY } from "../type";







export default function summary(state=null,action){
    switch(action.type){
        case  SUMMARY:
            return {...state,data:action.payload};
        
        default:
            return state;
    }
}


