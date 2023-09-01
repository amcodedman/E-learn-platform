import { toast } from "react-toastify"
import { CubeSpinner } from "react-spinners-kit";
import { Type } from "react-bootstrap-icons";


export const showToastify = (type, message) => {

    switch (type) {
        case "SUCCESS":
            toast.success(message, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            break;
        case "ERROR":
            toast.error(message, {
                position: toast.POSITION.BOTTOM_LEFT

            })
            break;
        default:
            return null

    }


}




export const CheckTopAds=(ads)=>{
const div=document.querySelectorAll(".categorytem")
const profile_container=document.querySelectorAll(".profile_layout")
if(!ads){
    div.forEach((item)=>{
        if(item){
            item.classList.add("categorytem_margin")
          
    
        }
    })
    profile_container.forEach((item)=>{
        if(item){
            item.classList.add("addTopmarginprofile")
        }
    })
}
else{
    div.forEach((item)=>{
        if(item){
            item.classList.remove("categorytem_margin")
          
    
        }
    })
    profile_container.forEach((item)=>{
        if(item){
            item.classList.remove("addTopmarginprofile")
        }
    })

}




}



export const CheckHover=()=>{
    const topcatlayout=document.querySelectorAll(".topcatlayout")
    const catebtn=document.querySelectorAll(".catebtn")
    topcatlayout.forEach((item)=>{
        if(item){
            item.addEventListener("mouseover",(e)=>{
               
                item.firstChild.classList.add("showTopcat")
                item.firstChild.firstChild.classList.remove("topcat_panim")
                item.firstChild.firstChild.classList.add("topcat_p")
               
                
            

            })
            item.addEventListener("mouseout",(e)=>{
                item.firstChild.classList.remove("showTopcat")
                item.firstChild.firstChild.classList.remove("topcat_p")
                item.firstChild.firstChild.classList.add("topcat_panim")

            

            
                        })
        }

    })
}




export const CheckTopp=()=>{
    const div=document.querySelectorAll(".categorytem")
    const profile_container=document.querySelectorAll(".profile_layout")

        div.forEach((item)=>{
            if(item){
                console.log(item.classList)

                if((item.classList.contains("categorytem"))){
                    item.classList.add("categorytem_margin")
                    item.classList.remove("categorytem")

                    console.log("Adding category")
                }
              
               
              
        
            }
        })
        profile_container.forEach((item)=>{

            if(item){
                if(!(item.classList.contains("addTopmarginprofile"))){
                    item.classList.add("addTopmarginprofile")
                }
            }
        })
        
        
    
    }
    
    
    
    
    
    
    export function saveEditorContent(convertToRaw, editorState) {
        const contentState = convertToRaw(editorState.getCurrentContent());
        const contentString = JSON.stringify(contentState);
        return contentString;
      }