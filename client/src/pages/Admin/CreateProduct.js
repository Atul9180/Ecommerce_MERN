import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Select } from "antd";
const { Option } = Select; //for dropdown options




const CreateProduct = () => {
    const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");


  //getAll categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/getAllCategory");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in getting category");
    }
  };


   //handle Create Product form
const handleCreateProduct=async (e)=>{
  e.preventDefault()
  try{    
    const productData=new FormData()    // using inbuilt browser function to get form data as not enclosed inputs in  form tags wrap them to avoid its use
    productData.append("name",name)
    productData.append("description",description)
    productData.append("price",price)
    productData.append("category",category)
    productData.append("quantity",quantity)
    productData.append("photo",photo)
    productData.append("shipping",shipping)
    const {data}=await axios.post('/api/v1/products/create-product',productData)
    if(data?.success){
      setTimeout(()=>toast.success(`Product created successfully`),10);
      navigate('/dashboard/admin/products')
    }
    else{
       toast.error(data?.message)
    }
  }
  catch(error){
    console.log(error)
    toast.error('Something went wrong while creating Product')
  }
}


  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <Layout title={"CreateProduct||E-Shop"}>
      <div className="container-fluid m-3 p3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Product</h1>
            <div className="m-1 w-75">
                            {/*<ProductForm handleSubmit={handleSubmit} value={name} setValue={setName} /> */}
              <Select
                bordered={false}
                placeholder="Select a Category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}{" "}
                  {/* if got photo then find name of photo. Use as label of file box */}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                    required
                  />
                </label>
              </div>
              <div className="mb-3">
                {/* if photo then return div to display img from source */}
                {photo && (
                  <div className="text-center">
                    {" "}
                    {/* below div will use browser properties to access url to preview images uploaded */}
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="productPhoto"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                  placeholder="Write product name."
                  required
                />
              </div>
              <div className="mb-3">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="form-control"
                  placeholder="Write product description."
                  required
                ></textarea>
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="form-control"
                  placeholder="Write product price."
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="form-control"
                  placeholder="Write product quantity."
                  required
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreateProduct}>Create Product</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
