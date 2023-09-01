import {EXPERIENCE} from "./../type";

export default function Experience(state=null,action){

switch(action.type){
    case EXPERIENCE:
        return {...state, experience:action.payload}
    default:
        return state
}
}