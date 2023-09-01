import { ACCESSCONTROL } from "../type";



export default function ControlVersion(state=null,action){

    switch(action.type){
        case ACCESSCONTROL:
            return {...state, control:action.payload}
        default:
            return state
    }



}