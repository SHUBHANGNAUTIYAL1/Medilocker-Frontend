import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import  './allreports.css'
import useFetch from '../../hook/useFetch';
import axios from 'axios'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial'
import usefe from '../../hook/usefe'
import UserCreate from '../usercreate/UserCreate'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { useState } from 'react'

function Allreports() {

    const[openRequest,setOpenRequest]=useState(false)

    const user = JSON.parse(localStorage.getItem('user'));
    
    const { data, loading, error }= useFetch(`http://localhost:8100/api/report/`);
    //const { data1, loading1, error1 }= usefe(`http://localhost:8100/api/agreement/`);
    //const users=data.docs.user;
   // console.log(users.username)
  
   const deleteDocument = async (docId) => {
    try {
      
      await axios.delete(`http://localhost:8100/api/report/${docId}`);
      
      window.location.reload();
      
      alert("PatientReport Removed Successfully ");
      // Display success message or handle response as needed
    

      
    } catch (error) {
      console.error('Error deleting Report:', error);
    }
  };

  


  return (
    <>
    <Navbar/>
    <div className="home-container4">
              
              <div className="container4">
                    <div className="top4">
                        <div className="header4">
                          <p>ALL Patient's Reports</p>
                        </div>
                        <div className="butt4">
                           
                        </div>                   
                    </div>
                    <div className="bottom4">
                    {loading? "Loading":(
                    <>
                       {data.Repo?.map((item) => {
                              
                        
                              return <div className="document4" key={item._id} >
                                          <div className="img4">
                                                  <FolderSpecialIcon/>
                                           </div>
                                                  <div className="fname4">
                                                    <p className='na'>{item.username}</p>
                                                    <p className='ro'>{item.name}</p>
                                                  </div>
                                                  <div className="icon4">
                                                      <DeleteIcon style={{color:"red"}} onClick={() => deleteDocument(item._id)}/>
                                
                                                   </div>
                                     </div>
                                                          
                           
                          
                         })}
                        </> 
                        )
                      } 
                      
                    
                      
                    </div>
              </div>
            </div>
         
    <Footer/>
    {openRequest && <UserCreate setOpen={setOpenRequest}/>}
    </>
  )
}

export default Allreports