import React,{useState} from "react";
import axios from 'axios';
import {API_BASE_URL} from '../../config';
import { Link, useNavigate } from "react-router-dom";
const Register=()=>{
    const navigate=useNavigate();
    const [formData,setFormData]=useState({
        username:'',
        email:'',
        password:''
    });
    const {username,email,password}=formData;

    const onChange=e=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    };
    
    const onSubmit=async e=>{
        e.preventDefault();
        try{
            const config={
                headers:{
                    'Content-type':'application/json'
                }
            };
            const body=JSON.stringify(formData);
            const res=await axios.post(`${API_BASE_URL}/auth/register`,body,config);
            const {message,userId}=res.data;
           // console.log(message,userId);
            alert(message);
            navigate("/");
        }catch(err){
            console.error("Registration failed",err.response.data);
            alert("Registration failed");
        }
    }
    return(
        <div>
            <h1>Register</h1>
            <form onSubmit={onSubmit}>
            <input 
                type='text' placeholder="Username" name="username" 
                value={username} onChange={onChange} required />
                <input 
                type='email' placeholder="Email" name="email" 
                value={email} onChange={onChange} required />
                <input 
                type='password' placeholder="Password" name="password" 
                value={password} onChange={onChange} required />
                <input type="submit" name="Register>"/>
            </form>
        </div>
    );
}

export default Register;
