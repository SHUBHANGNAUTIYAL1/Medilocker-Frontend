import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Agreements from "./pages/Agreements/Agreements"
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import About from "./pages/About/About";
import DoctorPage from "./pages/doctorpage/doctorhomePage/DoctorPage";
import Consultant from "./pages/doctorpage/consultant/Consultant";
import AdminHome from "../src/admin/adminhome/AdminHome";
import Allreports from "./admin/AllReports/Allreports";
import Pharmacy from "./pages/Pharmacy/Pharmacy";
import Medicine from "./pages/Medicine/Medicine";
import Prescription from "./pages/Prescription/Prescription";
import Analyze from "./pages/doctorpage/Analyze/Analyze";



function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/about" element={<About/>}/>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/agreement" element={<Agreements/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/doctor" element={<DoctorPage/>}/>
        <Route path="/consult" element={<Consultant/>}/>
        <Route path="/AdminHome" element={<AdminHome/>}/>
        <Route path="/All" element={<Allreports/>}/>
        <Route path="/Pharmacy" element={<Pharmacy/>}/>
        <Route path="/medicine" element={<Medicine/>}/>
        <Route path="/prescription" element={<Prescription/>}/>
        <Route path="/analyze" element={<Analyze/>}/>
       
        
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
