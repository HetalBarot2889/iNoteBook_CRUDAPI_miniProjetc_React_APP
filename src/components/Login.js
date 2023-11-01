import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';

function Login(props) {
  const [credentials, setCredentials] = useState({email: "", password: ""});
  let navigate = useNavigate()
 

  const handleSubmit = async (e) => {
    e.preventDefault();
      const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email: credentials.email, password: credentials.password}),
    });
    const json = await response.json();  
    console.log(json);
    if(json.success){
      //save the auth token redirect on home page
      localStorage.setItem('token', json.authToken);
      props.showAlert("You are logged in successfully","success")
      navigate("/")
    } else{
      props.showAlert("Invalid details","danger")
    }
  };
  
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div className='mt-2'>
      <h2>Login to continue iNoteBook...</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" value={credentials.email}  onChange={onChange} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" value={credentials.password}  onChange={onChange} name='password'/>
        </div>
        <button type="submit" className="btn btn-primary">Login </button>
      </form>
    </div>
  )
}

export default Login
