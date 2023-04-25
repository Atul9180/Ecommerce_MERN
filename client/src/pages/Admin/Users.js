import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";


const Users = () => {
  return (
    <Layout title={"Users||E-Shop"}>
      
      <div className="container-fluid m-3 p3">
        <div className="row">
            <div className="col-md-3"><AdminMenu /></div>
            <div className="col-md-9">
                <h1>All Users</h1>
            </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
