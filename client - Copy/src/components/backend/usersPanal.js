import { IconButton } from '@mui/material';

import React, { useEffect, useState } from 'react';

import { PencilSquare, Search,ChatDots } from 'react-bootstrap-icons';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { format } from 'date-fns';
const UserPanal=(props)=>{

const navigateTo=useNavigate();

const [searchText,setsearch]=useState(false)
const students=useSelector(value=>value.students)

    const [searchvalue, setSearchValue] = useState("");
    const handlesearchbox = (event) => {
        setSearchValue(event.target.value);
      };


      function formatDate(inputDate) {
        const date = new Date(inputDate);
        const formattedDate = format(date, 'EE LLL dd yyyy');
        return formattedDate;
      }

      useEffect(()=>{
        if(searchvalue.length ===0){
          
          
          setsearch(false)

        }
      })
    return(


        <div className="profile_box_m_admin">
        <div className='rowlayout'><p> All Students</p>
        <div className='searchfield'>
        <input
              type="text"
              className="searchboxMobile"
              id="searchid"
              name="search"
              onChange={handlesearchbox}
              value={searchvalue}
            />
            {searchvalue !== "" ? (
              <span className="searchbuttonmobile">
                <IconButton 
          
                  onClick={() => setsearch(true)}
              
                 >
                  <Search size={15} color="black" />
                </IconButton>{" "}
              </span>
            ) : null}

        </div>

        <div>


           
        </div>

      
        </div> 
        {
            
        }

        {


          searchText && searchvalue.length >0 ?
          
          <div className='tablelayout'>
        <div className='table_header'>
        <div className='headerlayout_n'> 
                Name

                </div>
                
                <div className='headerlayout'> 
              Subjects taken

                </div>
                <div className='headerlayout'> 
                Quizes Taken

                </div>
                <div className='headerlayout'> 
           Badges

                </div>
                <div className='headerlayout'> 
          Joined since

                </div>
                <div className='headerlayout'> 
          Actions

                </div>
        
        
        
        </div>

{
    students && students.data ?
    students.data.filter((value)=>((value.fullname).toLowerCase()).includes(searchvalue.toLowerCase())).map((data,index)=>{
        return(
            <div className='table_header'>
        <div className='headerlayout_nl'> 
                {data.fullname}

                </div>
                
                <div className='headerlayoutl'> 
             {data.subjects.length}

                </div>
                <div className='headerlayoutl'> 
                {data.quizes.length}

                </div>
                <div className='headerlayoutl'> 
                {data.badges.length}

                </div>
                <div className='headerlayoutl'> 
                {formatDate(data.createdAt)}
                </div>
                <div className='headerlayoutl'> 
                
                </div>
              

        </div>
            
        )

    })
    :null
}

       


            </div>
 
:

<div className='tablelayout'>
        <div className='table_header'>
        <div className='headerlayout_n'> 
                Name

                </div>
                
                <div className='headerlayout'> 
              Subjects taken

                </div>
                <div className='headerlayout'> 
                Quizes Taken

                </div>
                <div className='headerlayout'> 
           Badges

                </div>
                <div className='headerlayout'> 
          Joined since

                </div>
                <div className='headerlayout'> 
          Actions

                </div>
        
        
        
        </div>

{
    students && students.data ?
    students.data.map((data,index)=>{
        return(
            <div className='table_header'>
        <div className='headerlayout_nl'> 
                {data.fullname}

                </div>
                
                <div className='headerlayoutl'> 
             {data.subjects.length}

                </div>
                <div className='headerlayoutl'> 
                {data.quizes.length}

                </div>
                <div className='headerlayoutl'> 
                {data.badges.length}

                </div>
                <div className='headerlayoutl'> 
                {formatDate(data.createdAt)}
                </div>
                <div className='headerlayoutl'> 
             
                </div>

        </div>
            
        )

    })
    :null
}

       


            </div>
        }

    
 
 
    
   
   



      </div>
    )
}


export default UserPanal