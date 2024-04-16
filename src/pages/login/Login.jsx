
import "./login.css"
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate,Link } from "react-router-dom";

function Login() {

  localStorage.clear()
     
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const navigate=useNavigate()

    const handleChange = (e) => {
      setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };


    const handleClick = async (e) => {
      e.preventDefault();
    
      try {
        const res = await axios.post("https://medilocker-backend.onrender.com/api/auth/login", credentials);
      localStorage.setItem('user',JSON.stringify(res.data))
        const role=res.data.role
        console.log(role)
        if(role==="patient")
        {
        navigate("/about")
        }
        else if(role=='admin')
        {
          navigate("/AdminHome")
        }
        else{
          navigate("/doctor")
        }
      } catch (err) {
        console.log(err)
      }
    };


  return (
    <div className="lcontainer">
        <div className="login-container">
            <h2>Login</h2>
            <form className="logform" onSubmit={handleClick}>
                <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                    type="email"
                    id="email"
                    name="email"  onChange={handleChange}
                    required
                    placeholder="john@gmail.com"
                    className="log"
                />
                </div>
                <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"  onChange={handleChange}
                    placeholder="********"
                    className="log"
                    required
                />
                </div>
                <button className="button-login" type="submit">Login</button>
            </form>
            <p>New user? <Link to="/register"> signup now</Link> </p>
        </div>
    </div>
  )
}

export default Login