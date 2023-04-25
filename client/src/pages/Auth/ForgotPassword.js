import React,{useState} from 'react'
import '../../styles/AuthStyles.css';
import Layout from "../../components/Layout/Layout";
import {toast} from "react-toastify";
import { useNavigate} from "react-router-dom";
import axios from "axios";


const ForgotPassword = () => {
        const [email,setEmail]=useState("");
        const [newPassword,setNewPassword]=useState("");
        const [answer,setAnswer]=useState("");
        const navigate = useNavigate()

const handleFormSubmit=async (e)=>{
    e.preventDefault();
    try{
        const res= await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,{ email, newPassword,answer});
        if(res.data.success){
            toast.success(res.data.message);
           setTimeout(()=>navigate('/login'),1000); 
        }
        else{
            toast.error(res.data.success);
        }
    }catch(err){
        toast.error(err.response.data.message);
    }
}


  return (
    <Layout title={'ForgotPassword || E-Shop'}>
    <div className="form-container">
        <form onSubmit={handleFormSubmit}>
        <h4 className="title">RESET PASSWORD </h4>
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
              type="text"
              value={answer}
              onChange={(e)=>setAnswer(e.target.value)}
              className="form-control"
              id="inputAnswer"
               placeholder="Your Secret Friend's name?"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={newPassword}
              onChange={(e)=>setNewPassword(e.target.value)}
              className="form-control"
              id="inputNewPassword"
               placeholder="Enter New Password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Reset Password
          </button>
           
        </form>
      </div>
    </Layout>
  )
}

export default ForgotPassword