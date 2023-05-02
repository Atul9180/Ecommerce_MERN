import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Select } from "antd";
const { Option } = Select; //for dropdown options

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const [name, setName] = useState("this is prod");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [id, setId] = useState("");

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

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/get-product/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setPrice(data.product.price);
      setDescription(data.product.description);
      setCategory(data.product.category._id);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setPhoto(data.product.photo);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  //handle Update Product form
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData(); // using inbuilt browser function to get form data as not enclosed inputs in  form tags wrap them to avoid its use
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo); //if there is photo then only append
      productData.append("shipping", shipping);

      const { data } = await axios.put(
        `/api/v1/products/update-product/${id}`,
        productData
      );
      if (data?.success) {
        setTimeout(() => toast.success(`Product updated successfully`), 100);
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while creating Product");
    }
  };

  //delete category handler
  const handleDeleteProduct = async (id) => {
    try {
      let answer = window.prompt(
        "Are you sure you want to delete this Product?"
      );
      if (!answer) return;
      const { data } = await axios.delete(`/api/v1/products/product/${id}`);
      if (data.success) {
        setTimeout(() => toast.success(`Product deleted Successfully`), 100);
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong while updating category");
    }
  };

  useEffect(() => {
    getAllCategory();
    getSingleProduct();
    // eslint-disable-next-line
  }, []);

  return (
    <Layout title={"CreateProduct||E-Shop"}>
      <div className="container-fluid m-3 p3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
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
                value={category}
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
                {photo ? (
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
                ) : (
                  <div className="text-center">
                    {" "}
                    {/* below div will use browser properties to access url to preview images uploaded */}
                    <img
                      src={`/api/v1/products/product-photo/${id}`}
                      alt="productPhoto"
                      height={"200px"}
                      className="immg img-responsive"
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
                  value={shipping ? "Yes" : "No"}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button
                  className="btn btn-primary m-3"
                  onClick={handleUpdateProduct}
                >
                  Update Product
                </button>
                <button
                  className="btn btn-danger m-3"
                  onClick={() => {
                    handleDeleteProduct(`${id}`);
                  }}
                >
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
