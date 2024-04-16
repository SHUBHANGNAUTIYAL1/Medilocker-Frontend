import React from 'react'
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import "./register.css"
import axios from 'axios'


function Register() {
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
            const response=await axios.post("https://medilocker-backend.onrender.com/api/auth/register", newUser);
            console.log(response)
            
           navigate("/"); 

        } catch (error) {
            console.error('Error registering user:', error);
            
        }
        
    };
  return (
    <div className="Rcontainer">
        <div className="Register-container1">
            <h2>Sign up</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    className='username'
                    id="username"
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
                        <label htmlFor="doctor">Doctor</label>
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
                    <label htmlFor="patient">Patient:</label>
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
                    <label htmlFor="chief">Chief:</label>
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
                    <label htmlFor="responder">Responder:</label>
                </div>
                </div>
            </div>
                <button className="Register-button"type="submit">sign Up</button>
            </form>
            <p>Already a user? <Link to="/"> Login now</Link> </p>
        </div>
    </div>
  )
}

export default Register