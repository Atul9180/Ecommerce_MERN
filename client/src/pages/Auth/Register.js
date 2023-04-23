import React,{useState} from "react";
import Layout from "../../components/Layout/Layout";
import {toast} from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
        const [name,setName]=useState("");
        const [email,setEmail]=useState("");
        const [password,setpassword]=useState("");
        const [phone,setPhone]=useState("");
        const [address,setAddress]=useState("");
        const navigate = useNavigate()

const handleFormSubmit=async (e)=>{
    e.preventDefault();
    try{
        const res= await axios.post('http://localhost:8080/api/v1/auth/register',{ name, email, password, phone, address });
        if(res.data.success){
            toast.success(res.data.message);
            setTimeout(() => navigate('/contact'), 3000); 
        }
        else{
            toast.error(res.data.success);
        }
    }catch(err){
console.log(err)
toast.error('Something went wrong');
    }
}


return (
    <Layout title="Register||E-Shop">
      <div className="register">
        <h1>Register</h1>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              className="form-control"
              id="inputName"
              placeholder="Enter your Name"
              required
            />
          </div>
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
          <div className="mb-3">
            <input
              type="tel"
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
              className="form-control"
              id="inputPhone"
              pattern="[0-9]{10}"
               placeholder="Enter your Mobile Number"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e)=>setAddress(e.target.value)}
              className="form-control"
              id="inputAddress"
               placeholder="Enter your Address"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
