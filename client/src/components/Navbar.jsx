import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
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
        <div className="search-bar">
          <span className="material-symbols-outlined">search</span>{" "}
          <input type="text" placeholder="Search Products..." />
        </div>
        <div className="right">
          <button className="btn btn-warning mx-3">cart</button>
          <button className="btn btn-warning mx-3">profile</button>
          <button className="btn btn-warning mx-3">login</button>
          <button className="btn btn-warning mx-3">register</button>
          {/* <button className="btn btn-warning">lo</button> */}
        </div>
        <div className="sub-bar"></div>
      </div>
    </div>
  );
};

export default Navbar;
