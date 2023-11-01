import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';

function SignUP(props) {
  const [credentials, setCredentials] = useState({name: "",email: "", password: "", cpassword:""});
  let navigate = useNavigate()
 

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const {name , email, password} = credentials;
      const response = await fetch("http://localhost:5000/api/auth/createUser", {     
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name, email, password}),
    });
    const json = await response.json();  
    console.log(json);
    if(json.success){
      //save the auth token redirect on home page
      localStorage.setItem('token', json.authtoken);    
      navigate("/")
      props.showAlert("Your Account created successfully and sign up properly", "success")
    } else{
      //alert("Invalid Crediatials")
      props.showAlert("Invalid credialas", "danger")
    }
  };
  
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className='container mt-2'>
      <h2 className='my-2'>Create an Account & Use iNoteBook</h2>
      <form onSubmit={handleSubmitForm}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" onChange={onChange} name="password" />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange}/>
        </div>
        <button type="submit" className="btn btn-primary">SignUP</button>
      </form>
    </div>
  )
}

export default SignUP
