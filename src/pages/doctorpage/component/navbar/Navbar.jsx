import React from 'react'
import "./navbar.css"
import { Link } from 'react-router-dom'
import VaccinesIcon from '@mui/icons-material/Vaccines';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';

function Navbar() {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <nav className="navbar">
      <div className="logo"><VaccinesIcon style={{height:40}}/><span>MediLocker</span></div>
      <ul className="nav-links">
        <li><HomeIcon/><Link to="/doctor">Home</Link></li>
        <li><ContentPasteIcon/><Link to="/consult">PatientReports</Link></li>
        {
          user.role==='chief' &&(<li><DonutSmallIcon/><Link to="/analyze">Analyze</Link></li>)
        }
        <li><LogoutIcon/><Link to="/">Logout</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar