import React from 'react'
import "./navbar.css"
import { Link } from 'react-router-dom'
import VaccinesIcon from '@mui/icons-material/Vaccines';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import MedicationLiquidIcon from '@mui/icons-material/MedicationLiquid';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo" ><VaccinesIcon style={{height:40}}/><span>MediLocker</span></div>
      <ul className="nav-links">
        <li><HomeIcon/><Link to="/about">Home</Link></li>
        <li><PermIdentityIcon/><Link to="/home">Consult</Link></li>
        <li><ContentPasteIcon/><Link to="/prescription">Prescription</Link></li>
        
        <li><MedicationLiquidIcon/><Link to="/Pharmacy">Pharmacy</Link></li>
        <li><VaccinesIcon/><Link to="/medicine">Medicine</Link></li>
        <li><LogoutIcon/><Link to="/">Logout</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar