import React, { useState,useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Params, useParams } from "react-router-dom";



const ProductDetails = () => {
    const [product,setProduct]=useState({})
    const params=useParams();

//initial details:
useEffect(()=>{
    if(params?.slug) getProduct();
},[params?.slug])


    const getProduct =async()=>{
        try{
            const {data}=await axios.get(`/api/v1/products/get-product/${params.slug}`)
            setProduct(data?.product)
        }
        catch(error){
            console.log(error)
        }
    }
  return (
    <Layout title={"Product Detail||E-Shop"}>
      <div className="row"> 
       {JSON.stringify(product,null,4)} 
      <div className="col-md-5">image</div>
      <div className="col-md-5">detais</div>
      </div>
      <div className="row" >Similar products</div>

    </Layout>
  );
};

export default ProductDetails;
