import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search";

const Search = () => {
  const [values] = useSearch();
  return (
    <Layout title={"Search results||E-Shop"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Product Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
              <div className="card m-2" key={p._id} style={{ width: "18rem" }}>
                <img
                  src={`/api/v1/products/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title text-center">{p.name}</h5>
                  <p class="card-text">{p.description.substring(0, 30)}...</p>
                  <p class="card-text text-center">
                    <b>Price:</b> ${p.price}
                  </p>
                  <button className="btn btn-primary ms-1">More Details</button>
                  <button className="btn btn-secondary ms-1">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
