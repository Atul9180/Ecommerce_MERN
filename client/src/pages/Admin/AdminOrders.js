import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import moment from "moment";
import { useAuth } from "../../context/auth";
import { Select } from "antd";
const { Option } = Select;

const AdminOrders = () => {
  const [status] = useState([
    "Not Processed",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]);
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  //get all orders
  const getAllOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getAllOrders();
  }, [auth?.token]);

  const handleStatusChange = async (orderId, value) => {
    try {
      await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getAllOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="row mt-2">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Orders</h1>
          {orders?.map((order, indx) => {
            return (
              <div className="border shadow">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col"> Date & Time</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{indx + 1}</td>
                      <td>
                        <Select
                          bordered={false}
                          onChange={(value) =>
                            handleStatusChange(order._id, value)
                          }
                          defaultValue={order?.status}
                        >
                          {status.map((stat, indx) => (
                            <Option key={indx} value={stat}>
                              {stat}
                            </Option>
                          ))}
                        </Select>
                      </td>
                      <td>{order?.buyer?.name}</td>
                      <td>{moment(order?.createAt).fromNow()}</td>
                      <td>{order?.payment.success ? "Success" : "Failed"}</td>
                      <td>{order?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="container">
                  {order?.products?.map((product) => (
                    <div
                      className="row mb-2 p-3 card flex-row"
                      key={product._id}
                    >
                      <div className="col-md-4">
                        <img
                          src={`/api/v1/products/product-photo/${product._id}`}
                          className="card-img-top"
                          alt={product.name}
                          width={"100px"}
                          height={"100px"}
                        />
                      </div>
                      <div className="col-md-8">
                        <p>{product.name}</p>
                        <p>{product.description.substring(0, 30)}</p>
                        <p>Price : {product.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
