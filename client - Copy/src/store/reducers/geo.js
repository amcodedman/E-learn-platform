import {GEO} from "./../type";
export default function geodetails(state=null,action){
    switch(action.type){
        case GEO:
            return {...state,GEOD:action.payload};
        default:
            return state;
    }
}


