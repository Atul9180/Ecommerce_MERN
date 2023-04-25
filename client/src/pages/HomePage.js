import React from "react";
import Layout from "../components/Layout/Layout";
import {useAuth} from "../context/auth";      //import custom hook created in context api




const HomePage = () => {
  const [auth,setAuth]=useAuth();         //her get the global state functions from useAuth  hook 
  return (
    <Layout>
      <h1>HomePage</h1>
       <pre>{JSON.stringify(auth,null,4)}</pre>    {/*get global state data send by login response using custom hook*/}
    </Layout>
  );
};

export default HomePage;
