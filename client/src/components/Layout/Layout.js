import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Helmet } from "react-helmet";
import { ToastContainer} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


//props: {destructuring props to get dynamaic data}
//SEO: Helmet helping making header meta data dynamically in any page  using props
const Layout = ({ children, title, description, keywords }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content="Atul Patel" />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "70vh" }}>
      <ToastContainer />
      {children}</main>
      <Footer />
    </div>
  );
};



//setting some default props say default keywords.....
Layout.defaultProps = {
  title: 'E-Shop',
  keywords: "online store,shop,ecommerce,store ",
  description: "It is your own Ecommerce Shop where you can buy anything you want"
};


export default Layout;
