import React from 'react'
import "./dashboard.css"
import { useNavigate } from 'react-router-dom'

function Dashbaord() {

  const navigate=useNavigate();

  const HandleHome=()=>{
    navigate('/consult');
  }

  const HandleTimeTable=()=>{
    navigate('/doctor ');
  }

  return (
    <div className="dashboard">
      <div className="item " onClick={HandleHome}><p>Consultants</p></div>
      <div className="item" onClick={HandleTimeTable}><p>TimeTable</p></div>
    
        
    </div>
  )
}

export default Dashbaord