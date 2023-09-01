import {MAIN_COURSE} from "../type";



export default function newSubject(state=null,action){
    switch(action.type){
        case MAIN_COURSE:
            return {...state,data:action.payload};
        default:
            return state;
    }
}
