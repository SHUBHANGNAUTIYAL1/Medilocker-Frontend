import React from 'react'
import "./dashboard.css"
import { useNavigate } from 'react-router-dom'

function Dashbaord() {

  const navigate=useNavigate();

  const HandleHome=()=>{
    navigate('/home');
  }

  const HandleAgreement=()=>{
    navigate('/agreement');
  }

  return (
    <div className="dashboard">
      <div className="item " onClick={HandleHome}><p>Personal Reports</p></div>
      <div className="item" onClick={HandleAgreement}><p>Consultant</p></div>
    
        
    </div>
  )
}

export default Dashbaord