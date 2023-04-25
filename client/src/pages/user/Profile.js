import React from 'react'
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../context/auth';

const Profile = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Profile||E-Shop"}>
      
      <div className="container-fluid m-3 p3">
        <div className="row">
            <div className="col-md-3"><UserMenu /></div>
            
            <div className="col-md-9">
            <div className="card w-75 p-3 ">
                <h1>your Profile</h1>
                <h3>User Name: {auth?.user?.name}</h3>
                <h3>User Email: {auth?.user?.email}</h3>
                <h3>User Contact: {auth?.user?.phone}</h3>
            </div>
            </div>
        </div>
      </div>
    </Layout>
  )
}

export default Profile