import { ALLCOUPONS } from "../type";



export default function tokens(state=null,action){

    switch(action.type){
        case ALLCOUPONS:
            return {...state, coupons:action.payload}
        default:
            return state
        }



    }



