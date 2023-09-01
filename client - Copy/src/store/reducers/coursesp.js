import { COURSESP } from "../type";



export default function coursesp(state=null,action){

    switch(action.type){
        case COURSESP:
            return {...state, AllcourseP:action.payload}
        default:
            return state
    }



}