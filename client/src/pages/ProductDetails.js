import React, { useState,useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams ,useNavigate} from "react-router-dom";




const ProductDetails = () => {
    const [product,setProduct]=useState({})
    const [relatedProducts,setRelatedProducts] = useState([])       //jo bhi api se aa rha usko state me store kre
    const params=useParams();
    const navigate=useNavigate();


//initial details:
useEffect(()=>{
    if(params?.slug) getProduct();
},[params?.slug])


//get product
    const getProduct =async()=>{
        try{
            const {data}=await axios.get(`/api/v1/products/get-product/${params.slug}`)
            setProduct(data?.product);
            await getSimilarProducts(data?.product._id,data?.product.category._id);
        }
        catch(error){
            console.log(error)
        }
    }



//getSimilar Products ==>based on category
    const getSimilarProducts = async (pid,cid)=>{
        try{
            const {data}=await axios.get(`/api/v1/products/related-product/${pid}/${cid}`)
            setRelatedProducts(data?.products)
        }
        catch(error){
            console.log(error)
        }
    }

  return (
    <Layout title={"Product Detail||E-Shop"}>
      <div className="row container mt-2"> 
       {/* {JSON.stringify(product,null,4)}  */}
       <div className="col-md-6 mt-2"> 
       <img src={`/api/v1/products/product-photo/${product._id}`} className="card-img-top" alt={product.name} height={'400px'} width={'350px'} />
       </div>
      <div className="col-md-6 mt-2" >
        <h1 className="text-center">Product Details</h1>
        <h6>Name: {product.name}</h6>
        <h6>Description: {product.description}</h6>
        <h6>Price: {product.price}</h6>
        <h6>Category: {product?.category?.name}</h6>
        <button className="btn btn-secondary ms-1">Add to Cart</button>
      </div>
      </div>
      
      <div className="row container mt-5" >   
        <hr />   
        <h4>Similar Products</h4>
        {relatedProducts.length<1 && (<p className="text-center">No similar product found</p>) }
        <hr/>
        {/* {JSON.stringify(relatedProducts,null,4)} */}
        <div className="d-flex flex-wrap" height="100px" width="80px">
            {relatedProducts?.map((p) => (
            
            <div className="card m-2" key={p._id} style={{width:'18rem'}}>
                <img src={`/api/v1/products/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                <div className="card-body">
                  <h5 className="card-title text-center">{p.name}</h5>
                  <p class="card-text">{p.description.substring(0,30)}...</p>
                  <p class="card-text text-center"><b>Price:</b> ${p.price}</p>
                  <button className="btn btn-primary ms-1" 
                  onClick={()=>navigate(`/product/${p.slug}`)}>More Details</button>
                  <button className="btn btn-secondary ms-1">Add to Cart</button>
                </div>
              </div>
          ))}
          </div>
      </div>
      <br/>

    </Layout>
  );
};

export default ProductDetails;
