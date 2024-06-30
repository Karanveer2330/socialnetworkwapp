import React from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setLogin } from "state";



function SignUpForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstName,setfname]= useState("");
const [lastName,setlname]= useState("");
const [email,setemail]= useState("");
const [password,setpassword]= useState("");
const [location,setlocation]= useState("");
const [occupation,setoccupation]= useState("");
const [picturePath, setpicturePath] = useState();

const onSubmitForm = async(e)=>{
  e.preventDefault();
  try {
    const body = {firstName,lastName,email,password,location,occupation,picturePath};
  
  const response = await fetch(
    "http://localhost:3001/auth/register",
    {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(body)
    }
  );
    
  const savedUser = await response.json();
  
  if (savedUser) {
    alert(`Created Successfully, Login to your account`);
    navigate("/");
  }
}
  catch (err) {
    console.error(err.message);
  }
}
   
  return (
    <div className="form-container sign-up-container">
      <form onSubmit={onSubmitForm}>
        <h1>Create Account</h1>
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
        <span>or use your email for registration</span>
        <input
          type="text"
          name="First name"
          value={firstName} onChange={e=> setfname(e.target.value)}
          placeholder="First Name"
        />
        <input
          type="text"
          name="lname"
          value={lastName} onChange={e=> setlname(e.target.value)}
          placeholder="Last Name"
        />
        <input
          type="email"
          name="email"
          value={email} onChange={e=> setemail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={password} onChange={e=> setpassword(e.target.value)}
          placeholder="Password"
        />
        <input
          type="text"
          name="Location"
          value={location} onChange={e=> setlocation(e.target.value)}
          placeholder="Address"
        />
        
        <input
          type="text"
          name="occupation"
          value={occupation} onChange={e=> setoccupation(e.target.value)}
          placeholder="Bio"
        />
        <input
          type="file"
          name="Propicturepath p"
          value={picturePath} onChange={e=> setpicturePath(e.target.value)}
          placeholder="Profile Picture"
        />
        <button>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;