import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  

  //get all products:
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/products/get-product");
      if (data?.success) {
        setProducts(data?.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in getting products");
    }
  };

  
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products List</h1>
         <div className="d-flex flex-wrap">
          {products?.map((p) => (
            <Link key={p._id} to={`/dashboard/admin/update-product/${p.slug}`} className="product-link">
              <div className="card m-2" key={p._id} style={{width:'18rem'}}>
                <img src={`/api/v1/products/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p class="card-text">{p.description.substring(0,30)}...</p>
                  <p class="card-text text-center"><b>Price:</b> ${p.price}</p>
                </div>
              </div>
            </Link>
          ))}
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default Products;
