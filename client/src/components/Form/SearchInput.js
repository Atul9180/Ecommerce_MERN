import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `/api/v1/products/search-product/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form className="d-flex" role="search" onSubmit={handleSearch}>
        {/* <div className="mb-3"> */}
        <input
          type="search"
          className="form-control me-2"
          placeholder="Search....."
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        {/* </div> */}

        <button type="submit" className="btn btn-outline-success">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
