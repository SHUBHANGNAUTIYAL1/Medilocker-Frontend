// Modal.js
import axios from "axios";
import React, { useState ,useEffect } from 'react';
import './newdocument.css'; // Import CSS file for styling
import useFetch from "../../hook/useFetch";
import usefe from "../../hook/usefe"
import CryptoJS from 'crypto-js'

const NewDocument = ({ setOpen }) => {
  
  const user = JSON.parse(localStorage.getItem('user'));
  const userid=user._id;
  const { data, loading, error }= useFetch(`https://medilocker-backend.onrender.com/api/auth/`);
  const {data1,loading1,error1}=usefe(`https://medilocker-backend.onrender.com/api/auth/user/${userid}`)
  console.log(data1);
   
    const [file, setFile] = useState(null);
    const [name, setFileName] = useState("");
    const [doctor,setDoctor]=useState("");
    const[disease,setDisease]=useState("");
    const[sugar,setSugar]=useState();
    const[bp,setBp]=useState();
    const[heart,setHeart]=useState();
    const[pulse,setPulse]=useState();
    const [surgery,setSurgery]=useState("");
    
   
    
    useEffect(() => {
      console.log("Doctor:", doctor);
    }, [doctor]);
  
    useEffect(() => {
      console.log("Surgery:", surgery);
    }, [surgery]); 

    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };
  
    const handleFileNameChange = (e) => {

      setFileName(e.target.value);
      
    };

    const encryptFileUrl = (url, key) => {
      const encryptedFile= CryptoJS.AES.encrypt(url, key).toString();
      console.log(encryptedFile)
      return encryptedFile;
    };

  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        // Upload file to Cloudinary
       const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "upload"); // Replace 'upload' with your upload preset
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dh6zjine0/image/upload",
          formData
        );
        const fileUrl = uploadRes.data.url;
        const key="YourSecretKey";
        const encryptedFile = encryptFileUrl(fileUrl,key);
        console.log(fileUrl)
        console.log(userid)
  
      
        await axios.post("http://localhost:8100/api/report/upload-single", {
        username:data1.user.username,  
        name,
          disease,
          sugar,
          bp,
          heart,
          pulse,
          doctor,
          surgery,
          file:encryptedFile,
          user:userid,
        });
        alert("Your Report Added Successfully")
        window.location.reload();

  
        // Close the modal
        setOpen(false);
      } catch (error) {
        alert("Fill all the fields")
        console.error("Error uploading file:", error);
        // Handle error
      }
    };
  
    const handleUserChange = (e) => {
      
      
      const selectedDoctor = e.target.value;
      setDoctor(selectedDoctor);
      
     
  };
  const handleSurgeryChange = (e) => {
      
      
    const surgeryValue = e.target.value;
  
    setSurgery(surgeryValue);
    
   
};


  return (
    
      
      
        <div className="modal1">
        <div className="modal-content1">
          <span className="close" onClick={() => setOpen(false)}>&times;</span>
          <h2>Upload Your Medicinal Report</h2>
          
          
          <form className="form1">
          <input type="file" className="file2" style={{border:'none'}} onChange={handleFileChange} />
          <input type="text" placeholder="Enter File Name here!!!" className='file2' value={name} onChange={handleFileNameChange} />
          <input type="text" placeholder="Enter the disease!!!" className='file2' value={disease} onChange={(e)=>setDisease(e.target.value)}  />
          <input type="Number" placeholder=" Sugar count!!!" className='file2' value={sugar} onChange={(e)=>setSugar(e.target.value)}/>
          <input type="Number" placeholder="Bp count!!!" className='file2'  value={bp} onChange={(e)=>setBp(e.target.value)}/>
          <input type="Number" placeholder="Heart rate count!!!" className='file2' onChange={(e)=>setHeart(e.target.value)} />
          <input type="Number" placeholder="Pulse Count!!!" className='file2' onChange={(e)=>setPulse(e.target.value)} />
          <input list="options" value={doctor} onChange={ handleUserChange} className="file2" placeholder="Choose Doctor" />
                            <datalist id="options">
                            {loading? "Loading":(
                    <>
                       {data.user?.map((item,index) => {
                            if(item.role=="doctor")
                            return <option key={index+1} value={item._id} >{item.username}</option>
                            else return null
                            
                         })}
                        </> 
                        )
                      } 
                    
                    </datalist>
                    <input list="options2" value={surgery} onChange={ handleSurgeryChange} className="file2" placeholder="Gone Through Past Surgery" />
                      <datalist id="options2">
                           <option  value="Yes" ></option>
                           <option  value="No" ></option>
                      </datalist>
          
                      <button onClick={handleSubmit} className="button-submit">Submit</button>
          </form>
         
        </div>
        </div>
      
    
  );
}

export default NewDocument;
