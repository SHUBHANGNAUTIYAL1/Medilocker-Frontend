// Modal.js
import axios from "axios";
import React, { useState } from 'react';
import CryptoJS from 'crypto-js'
import useFetch from "../../../../hook/useFetch";
import './patient.css'; // Import CSS file for styling
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import Prescription from "../prescription/Prescription";
import Pres from "../../../../components/pres/pres";



const Patient = ({ setOpen ,item }) => {

  const [opendocmodal, setOpendocModal]=useState(false)
  const [openpresmodal, setOpenpresModal]=useState(false)
  const aeskey="YourSecretKey";
 
  
  const user = JSON.parse(localStorage.getItem('user'));
  const userid=user._id;
  const { data, loading, error }= useFetch(`http://localhost:8100/api/report/${item}`);
  console.log(item)
   
  const decryptFileUrl = (encryptedFile, key) => {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedFile, key);
    const decryptedFile = decryptedBytes.toString(CryptoJS.enc.Utf8);
    console.log(decryptedFile);
    return decryptedFile;
  };

 const  downloadDocument=()=>{
    // Trigger download by creating a link element
    const link = document.createElement('a');
    link.href = item.file
    link.download = item.name; // Set the desired filename here
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

 }


  

  


  return (
    
      
      
        <div className="docall">
        <div className="docall-content">
             
          
          <div className="navtop1">
                <span className="close" onClick={() => setOpen(false)}>&times;</span>
                <h1>{item.name} </h1>
          </div>
          <div className="center">
            
                
                    <div className="center-left" onClick={downloadDocument}>
                        <img src={decryptFileUrl(item.file,aeskey)} alt="" />
                    </div>
                    <div className="center-right1">
                        <h1>Medical History</h1>
                        <h2>Name : <span> {item.username}</span> </h2>
                        <h2>Disease : <span>{item.disease}</span></h2>
                        { user.role!='responder' &&
                         ( <>
                        <h2>Sugar level : <span>{item.sugar}</span></h2>
                        <h2>Bp level :<span> {item.bp}</span></h2>
                        <h2>Heart rate : <span>{item.heart}</span></h2>
                        <h2>Pulse rate : <span>{item.pulse}</span></h2>
                        <h2>Previous surgery : <span>{item.surgery}</span></h2>
                        </>
                         )
                        } 
                        {user.role === 'doctor' && (
                         <button className="prescribe" onClick={() => setOpendocModal(!opendocmodal)}>Add Prescription</button>
                         )}
                         {user.role === 'chief' && (
                         <button className="prescribe" onClick={() => setOpenpresModal(!openpresmodal)}>See Prescription</button>
                         )}
                        

                    </div>
                
              


          </div>
          <div className="foot1"></div>
          

          

        </div>
        { opendocmodal&& <Prescription  setOpen={setOpendocModal} patient={item.user} id={item._id} />}
        { openpresmodal&& <Pres  setOpen={setOpenpresModal} item={item} />}
        </div>
         
      
    
  );
}

export default Patient;
