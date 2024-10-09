import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const [searchItem, setSearchItem] = useState("");
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/product/search/${searchItem}`);
    setSearchItem("");
  };
  return (
    <div className="nav sticky-top">
      <div className="nav-bar ">
        <Link
          to={"/"}
          className="left"
          style={{ textDecoration: "none", color: "white" }}
        >
          <h1>ShopKart</h1>
        </Link>
        <form className="search-bar" onSubmit={submitHandler}>
          <span className="material-symbols-outlined">search</span>{" "}
          <input
            type="text"
            placeholder="Search Products..."
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
          />
        </form>
        <div className="right">
          <button className="btn btn-warning mx-3">cart</button>
          <button className="btn btn-warning mx-3">profile</button>
          <button className="btn btn-warning mx-3">login</button>
          <Link to={"/register"} className="btn btn-info mx-3">
            register
          </Link>
          {/* <button className="btn btn-warning">lo</button> */}
        </div>
        <div className="sub-bar"></div>
      </div>
    </div>
  );
};

export default Navbar;
