import React from 'react'
import './usercreate.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function UserCreate({setOpen}) {

    const [formData, setFormData] = useState({
        username:"",
        email:"",
        password:"",
        role:"",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const navigate=useNavigate();
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const newUser={
                ...formData
            }
            const response=await axios.post("http://localhost:8100/api/auth/register", newUser);
            console.log(response)
            
            window.location.reload();
            alert("User Added Successfully");
         
           
      
            // Close the modal
            setOpen(false);

        } catch (error) {
            console.error('Error registering user:', error);
            
        }
        
    };

  return (
    <div className="register-modal">
        <div className="register-content">
                <span className="close" onClick={() => setOpen(false)}>&times;</span>
                <h2>Fill The Details of New User</h2>
                <form onSubmit={handleSubmit}>
                <div className="form-group8">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        className="createuser"
                        name="username"
                        value={formData.username} onChange={handleChange}
                        placeholder='john'
                        required
                    />
                </div>
                <div className="form-group8">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                    
                        value={formData.email} onChange={handleChange}
                        placeholder='john@gmail.com'
                        required
                    />
                </div>
                <div className="form-group8">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        
                        value={formData.password} onChange={handleChange}
                        required
                        placeholder="**************"
                    />
                </div>
                <div className="form-group9">
                <label>Role:</label>
                <div className="k">
                    <div className='l'>
                        <input
                            type="radio"
                            id="doctor"
                            name="role"
                            value="doctor"
                            checked={formData.role === 'doctor'}
                            onChange={handleChange}
                        />
                        <label htmlFor="doctor">doctor</label>
                    </div>
                <div  className='l'>
                    <input
                        type="radio"
                        id="patient"
                        name="role"
                        value="patient"
                        checked={formData.role === 'patient'}
                        onChange={handleChange}
                    />
                    <label htmlFor="patient">patient</label>
                </div>
                <div  className='l'>
                    <input
                        type="radio"
                        id="chief"
                        name="role"
                        value="chief"
                        checked={formData.role === 'chief'}
                        onChange={handleChange}
                    />
                    <label htmlFor="patient">Chief</label>
                </div>
                <div  className='l'>
                    <input
                        type="radio"
                        id="responder"
                        name="role"
                        value="responder"
                        checked={formData.role === 'responder'}
                        onChange={handleChange}
                    />
                    <label htmlFor="patient">Responder</label>
                </div>
            
                </div>
                </div>
            
               
                
                
            
                <button className="Register-button"type="submit">Add User</button>
            </form>
               
               
                
          
        </div>
        </div>
  )
}

export default UserCreate