import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import "./home.css"
import Dashbaord from '../../components/dashboard/Dashboard'
import NewDocument from '../../components/newdocument/NewDocument'
import {useState} from "react"
import useFetch from '../../hook/useFetch';
import CryptoJS from 'crypto-js'
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import axios from "axios"
import Patient from '../doctorpage/component/PatientReport/Patient'


function Home() {
  const [opendocmodal, setOpendocModal]=useState(false)
  const [item,setItem]=useState(null); // State to track the clicked document
  const [selectedDocument, setSelectedDocument] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user)
  const aeskey="YourSecretKey";
  
  const { data, loading, error } = useFetch(`https://medilocker-backend.onrender.com/api/report/user/${user._id}`);
 console.log(data);

 const decryptFileUrl = (encryptedFile, key) => {
  const decryptedBytes = CryptoJS.AES.decrypt(encryptedFile, key);
  const decryptedFile = decryptedBytes.toString(CryptoJS.enc.Utf8);
  console.log(decryptedFile);
  return decryptedFile;
}; 

 const deleteDocument = async (docId) => {
  try {
    
    await axios.delete(`https://medilocker-backend.onrender.com/api/report/${docId}`);
    
    window.location.reload();
  } catch (error) {
    console.error('Error deleting document:', error);
  }
};

// Function to download a document
const downloadDocument = (item) => {
  const link = document.createElement('a');
    link.href = decryptFileUrl(item.file,aeskey);
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
         
            <div className="home-container">
              
              <div className="container1">
                    <div className="top2">
                       <div className="title">
                          <p>Your Medical History</p>
                       </div>
                       <div className="butt">
                          <button className="Add1" onClick={()=>setOpendocModal(!opendocmodal)}>ADD<span className='plus'>+</span></button>
                       </div>
                    </div>
                    <div className="bottom3">
                    {loading? "Loading":(
                    <>
                       {data.Repo.map((item) => {
                        if(item.status){
                        return <div className="document1" key={item._id} onClick={() => handleDocumentClick(item)}>
                                <div className="img">
                                <FolderSpecialIcon/>
                                </div>
                                <div className="fname8">
                                  <p>{item.disease} Report</p>
                                </div>
                                <div className="icon">
                                <FileDownloadIcon onClick={() => downloadDocument(item)}/>
                                <DeleteIcon onClick={() => deleteDocument(item._id)}/>
                                
                                </div>
                        </div>
                        }
                        else{
                        return null
                        }
                         })}
                        </> 
                        )
                      } 
                    
                      
                    </div>
              </div>
            </div>
         
        
        <Footer/>
        {opendocmodal && <NewDocument setOpen={setOpendocModal} />}
        {selectedDocument && <Patient setOpen={setSelectedDocument} item={item}/>}
        
     
    </>
  )
}

export default Home