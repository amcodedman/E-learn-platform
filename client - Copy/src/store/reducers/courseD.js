import {COURSEBYID} from "../type";



export default function singleSubject(state=null,action){
    switch(action.type){
        case COURSEBYID:
            return {...state,data:action.payload};
        default:
            return state;
    }
}
