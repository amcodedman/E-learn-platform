import { COURSES } from "../type";



export default function Allsubjects(state=null,action){

    switch(action.type){
        case COURSES:
            return {...state, data:action.payload}
        default:
            return state
    }



}