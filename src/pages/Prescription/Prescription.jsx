import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import "./prescription.css"
import NewDocument from '../../components/newdocument/NewDocument'
import {useState} from "react"
import useFetch from '../../hook/useFetch';
import Pres from '../../components/pres/pres'

import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import axios from "axios"


function Prescription() {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [item,setItem]=useState(null);
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user)
  
  const { data, loading, error } = useFetch(`https://medilocker-backend.onrender.com/api/prescription/pres/${user._id}`);
 console.log(data);


 const deleteDocument = async (docId) => {
  try {
    
    await axios.delete(`https://medilocker-backend.onrender.com/api/report/${docId}`);
    
    window.location.reload();
  } catch (error) {
    console.error('Error deleting document:', error);
  }
};


const handleDocumentClick = async(document) => {
  setItem(document);
  setSelectedDocument(document);
 
};

  return (
    <>
       
        <Navbar/>
         
            <div className="home-container">
              
              <div className="container1">
                    <div className="top2">
                       <div className="title">
                          <p>All Your Prescriptions</p>
                       </div>
                    
                    </div>
                    <div className="bottom3">
                    {loading? "Loading":(
                    <>
                       {data.Pres.map((item) => {
                        return <div className="document1" key={item._id} onClick={() => handleDocumentClick(item)}>
                                <div className="img">
                                <FolderSpecialIcon/>
                                </div>
                                <div className="fname8">
                                  <p> Dr. {item.name} </p>
                                </div>
                                <div className="fname8">
                                  <p>Prescription</p>
                                </div>
                                <div className="icon">
                               
                                <DeleteIcon onClick={() => deleteDocument(item._id)}/>
                                
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
        {selectedDocument && <Pres setOpen={setSelectedDocument} item={item}/>}
        
        
     
    </>
  )
}

export default Prescription