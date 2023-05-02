import React from "react";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";
import useCategoryHook from "../hooks/useCategoryHook";
import "../styles/AllProductCategory.css";

const Categories = () => {
  const categories = useCategoryHook();

  return (
    <Layout title={"All Categories||E-Shop"}>
      <div className="container">
        <div className="row">
          {categories.map((c) => (
            <div className="col-md-6 mt-5 mb-3 gx-3 gy-3" key={c._id}>
              <Link to={`/category/${c.slug}`} className="btn btn-primary">
                {c.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
