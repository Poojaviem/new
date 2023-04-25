
import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';
import {  signInWithEmailAndPassword } from "firebase/auth";
import {toast } from 'react-toastify';
import { auth } from '../firebase';


function AdminLogin() {

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");


    const navitage = useNavigate()

    const handleLogin=(e)=>{
        e.preventDefault();
      

        signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
 
    const user = userCredential.user;
    
    toast.success("successfuly Login",{
      position: toast.POSITION.TOP_CENTER
    })
    
        navitage("/PatientDashboard")
    
  })
  .catch((error)=>{
    toast.error('Wrong Email and Password', {
      position: toast.POSITION.TOP_CENTER
  });
  
  })
  
    }
  return (
    <div className='login'>
    <form className='form1' onSubmit={handleLogin}>
      <label htmlFor='email'>Email</label>
      <input className='email1' type='email' id='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} required/><br/>
      <label htmlFor='password'>Password</label>
      <input type='password' id='password' className='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} required/><br/>
      <button className='btn' type='submit'>Login</button>
    </form>
  </div>
  )
}

export default AdminLogin