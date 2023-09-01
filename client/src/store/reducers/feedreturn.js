import {FEEDRETURN,FEEDRETURNCLEAR} from "./../type";



export default function feedreturn(state=null,action){
    switch(action.type){
        case  FEEDRETURN:
            return {...state,data:action.payload};
        case  FEEDRETURNCLEAR:
            return null;
        default:
            return state;
    }
}


