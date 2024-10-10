import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";
const Navbar = () => {
  const [searchItem, setSearchItem] = useState(" ");
  const navigate = useNavigate();
  const { setFilteredData, products } = useContext(AppContext);

  const filterByCategory = (c) => {
    setFilteredData(
      products.filter((data) => data.category.toLowerCase() === c.toLowerCase())
    );
  };
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/product/search/${searchItem}`);
    setSearchItem(" ");
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
          <Link to={"/login"} className="btn btn-info mx-3">
            login
          </Link>
          <Link to={"/register"} className="btn btn-info mx-3">
            register
          </Link>
          <button className="btn btn-warning">logout</button>
        </div>
      </div>
      <div className="sub-bar">
        <div className="items" onClick={() => filterByCategory(products)}>
          No Filter
        </div>
        <div className="items" onClick={() => filterByCategory("mobiles")}>
          Mobiles
        </div>
        <div className="items" onClick={() => filterByCategory("laptops")}>
          Laptops
        </div>
        <div className="items" onClick={() => filterByCategory("camera")}>
          Camera
        </div>
        <div className="items" onClick={() => filterByCategory("headphones")}>
          Headphones
        </div>
        <div className="items">15999</div>
        <div className="items">25999</div>
        <div className="items">49999</div>
        <div className="items">69999</div>
        <div className="items">89999</div>
      </div>
    </div>
  );
};

export default Navbar;
