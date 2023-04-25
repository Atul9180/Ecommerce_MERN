import React from 'react'
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';

const Orders = () => {
  return (
    <Layout title={"Orders||E-Shop"}>
      
      <div className="container-fluid m-3 p3">
        <div className="row">
            <div className="col-md-3"><UserMenu /></div>
            
            <div className="col-md-9">
            <div className="card w-75 p-3 ">
                <h1>My Orders</h1>
            </div>
            </div>
        </div>
      </div>
    </Layout>
  )
}

export default Orders