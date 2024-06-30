import React from "react";
import { useState } from "react";
import './Login.css'
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const[email,setemail]=useState("");
  const[password,setpassword]=useState("");

  const onSubmitForm = async(e)=>{
    e.preventDefault();
   
      const body = {email, password};
      const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    
    const loggedIn = await loggedInResponse.json();
    
    
    if (loggedIn) {
      
      alert(`You are login with email: ${email} and password: ${password}`);
      dispatch( 
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
      
    }
    else{
      alert(`Wrong`);
    }
  }




  return (
    <div className="form-container sign-in-container">
      <form id="new" onSubmit={onSubmitForm}>
        <h1>Sign in</h1>
        <div className="social-container">
          <a href="#" className="social">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-google-plus-g" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-linkedin-in" />
          </a>
        </div>
        <span>or use your account</span>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email} onChange={e=> setemail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password} onChange={e=> setpassword(e.target.value) }
        />
        <a href="#">Forgot your password?</a>
        <button onClick={""}>Sign In</button>
      </form>
    </div>
  );
}

export default Login;