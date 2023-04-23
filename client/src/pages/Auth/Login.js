import React,{useState} from "react";
import '../../styles/AuthStyles.css';
import Layout from "../../components/Layout/Layout";
import {toast} from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Login = () => {
        const [email,setEmail]=useState("");
        const [password,setpassword]=useState("");
        const navigate = useNavigate()


const handleFormSubmit=async (e)=>{
    e.preventDefault();
    try{
        const res= await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`,{ email, password});
        if(res.data.success){
            // const {message, token, user} = res.data;
            toast.success(res.data.message);
            setTimeout(()=>navigate('/'),1000); 
        }
        else{
            toast.error(res.data.success);
        }
    }catch(err){
        toast.error(err.response.data.message);
    }
}



return (
    <Layout title="Login || E-Shop">
    
      <div className="form-container">
        <form onSubmit={handleFormSubmit}>
        <h4 className="title">LOGIN FORM</h4>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="form-control"
              id="inputEmail"
               placeholder="Enter your Email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e)=>setpassword(e.target.value)}
              className="form-control"
              id="inputPassword"
               placeholder="Enter your Password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
      
    </Layout>
  );
};

export default Login;
