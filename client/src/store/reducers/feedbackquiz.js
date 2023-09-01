import {FEEDBACK, } from "./../type";



export default function feedback(state=null,action){
    switch(action.type){
        case FEEDBACK:
            return {...state,data:action.payload};
        default:
            return state;
    }
}


