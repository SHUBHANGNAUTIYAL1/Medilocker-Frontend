import React from 'react'
import './consultant.css'
import Dashbaord from '../component/dashboard/Dashboard';
import Navbar from '../component/navbar/Navbar';
import Footer from '../component/footer/Footer';
import { useState } from 'react'
import useFetch from '../../../hook/useFetch';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import axios from "axios"
import CryptoJS from 'crypto-js'
import { json } from 'react-router-dom';
import Patient from '../component/PatientReport/Patient';
import usefe from '../../../hook/usefe'
import Request from '../../../components/request/Request';

function Consultant() {
  const [item,setItem]=useState(null); // State to track the clicked document
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [openRequest, setopenRequest] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const UserId=user._id;
  //console.log(Useremail)

  
  const { data, loading, error }= useFetch(`https://medilocker-backend.onrender.com/api/report/patient/${UserId}`);
  const { data1, loading1, error1 }= usefe(`https://medilocker-backend.onrender.com/api/report/`);
  const aeskey="YourSecretKey";
  console.log(data1)

  const decryptFileUrl = (encryptedFile, key) => {
    try {
      const decryptedBytes = CryptoJS.AES.decrypt(encryptedFile, key);
      const decryptedFile = decryptedBytes.toString(CryptoJS.enc.Utf8);
      console.log("Decrypted file URL:", decryptedFile);
      return decryptedFile;
    } catch (error) {
      console.error("Error decrypting file URL:", error);
      return null; // Handle decryption error
    }
  };

 const deleteDocument = async (docId) => {
  try {
    
    await axios.delete(`https://medilocker-backend.onrender.com/api/agreement/${docId}`);
    
    window.location.reload();
  } catch (error) {
    console.error('Error deleting document:', error);
  }
};




const downloadDocument = (item) => {
  const link = document.createElement('a');
  console.log(item.file)
    link.href = decryptFileUrl(item.file,aeskey);
    console.log(link.href);
    link.download = item.name; // You can set the desired filename here
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};


const handleDocumentClick = async(document) => {
  setItem(document);
  setSelectedDocument(document);
 
};


  return (

    <>
    <Navbar/>
         
            <div className="home-container5">
              
              <div className="container4">
                    <div className="top4">
                        <div className="header4">
                          <p>Your Consultancies</p>
                        </div>
                        {user.role==='responder' &&(
                        <div className='butt4'>
                        <button className='Add4' onClick={() => setopenRequest(!openRequest)}>Requests</button>
                        </div>)
                        }
                    </div>
                    <div className="bottom8">
                    {user.role === 'doctor' ? (
                      loading ? "Loading" : (
                        <>
                          {data.Repo.map((item) => {
                             
                             if(item.status)
                             {
                             
                             return <div className="document4" key={item._id} onClick={() => handleDocumentClick(item)}>
                              <div className="img4">
                                <FolderSpecialIcon/>
                              </div>
                              <div className="fname4">
                                <p>{item.username}</p>
                                <p>{item.name}</p>
                              </div>
                              <div className="icon4">
                                <FileDownloadIcon onClick={() => downloadDocument(item)}/>
                                <DeleteIcon onClick={() => deleteDocument(item._id)}/>
                              </div>
                            </div>}
                            else{
                              return null
                            }
                            
                           
                           })}
                        </>
                      )
                    ) : (
                      loading1 ? "Loading" : (
                        <>
                          {data1.Repo.map((item) => {
                            if(item.status){
                            return  <div className="document4" key={item._id} onClick={() => handleDocumentClick(item)}>
                              <div className="img4">
                                <FolderSpecialIcon/>
                              </div>
                              <div className="fname4">
                                <p>{item.username}</p>
                                <p>{item.name}</p>
                              </div>
                              <div className="icon4">
                                <FileDownloadIcon onClick={() => downloadDocument(item)}/>
                                <DeleteIcon onClick={() => deleteDocument(item._id)}/>
                              </div>
                            </div>}
                            else{
                              return null
                            }
                            })}
                        </>
                      )
                    )}
                  </div>
                    
                   
              </div>
            </div>
         
        
        <Footer/>
        {selectedDocument && <Patient setOpen={setSelectedDocument} item={item}/>}
        {openRequest && <Request setOpen={setopenRequest} item={item}/>}
        

        </>
  )
}

export default Consultant