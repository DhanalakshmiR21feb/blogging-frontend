import React,{useState} from "react";
import axios from 'axios';
import { API_BASE_URL } from "../../config";
import { useNavigate } from "react-router-dom";
const Login=()=>{
    const navigate=useNavigate();
    const [formData,setFormData]=useState({
        email:'',
        password:''
    });
    const {email,password}=formData;

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
            const res=await axios.post(`${API_BASE_URL}/auth/login`,body,config);
            const {message,token,userId}=res.data;
            localStorage.setItem('token',token);
          //  console.log(message,userId);
            alert(message,"UserID",userId);
            navigate("/dashboard");
        }catch(err){
            console.error("login failed",err.response.data);
            alert("login failed");
        }
    }
    return(
        <div>
            <h1>Login</h1>
            <form onSubmit={onSubmit}>
                <input 
                type='email' placeholder="Email" name="email" 
                value={email} onChange={onChange} required />
                <input 
                type='password' placeholder="Password" name="password" 
                value={password} onChange={onChange} required />
                <input type="submit" name="Login>"/>
            </form>
        </div>
    );
}

export default Login;
