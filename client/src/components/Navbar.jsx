import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import AppContext from "../context/AppContext";
const Navbar = () => {
  const [searchItem, setSearchItem] = useState(" ");
  const navigate = useNavigate();
  const location = useLocation();
  const { setFilteredData, products, logout, isAuthenticated, user, cart } =
    useContext(AppContext);
  console.log("user cart", cart);

  const filterByCategory = (c) => {
    setFilteredData(
      products.filter((data) => data.category.toLowerCase() === c.toLowerCase())
    );
  };
  const filterByPrice = (price) => {
    setFilteredData(products.filter((data) => data.price >= price));
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
          {isAuthenticated && (
            <>
              <Link
                to={"/cart"}
                type="button"
                className="btn btn-primary position-relative"
              >
                <span className="material-symbols-outlined">shopping_cart</span>

                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cart?.items?.length}
                  <span className="visually-hidden">unread messages</span>
                </span>
              </Link>
              <Link to={"/profile"} className="btn btn-primary mx-3">
                {user?.name}
              </Link>
              <button
                className="btn btn-warning"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                logout
              </button>
            </>
          )}
          {!isAuthenticated && (
            <>
              <Link to={"/login"} className="btn btn-info mx-3">
                login
              </Link>
              <Link to={"/register"} className="btn btn-info mx-3">
                register
              </Link>
            </>
          )}
        </div>
      </div>
      {location.pathname == "/" && (
        <div className="sub-bar">
          <div className="items" onClick={() => setFilteredData(products)}>
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
          <div className="items" onClick={() => filterByPrice(15999)}>
            15999
          </div>
          <div className="items" onClick={() => filterByPrice(25999)}>
            25999
          </div>
          <div className="items" onClick={() => filterByPrice(49999)}>
            49999
          </div>
          <div className="items" onClick={() => filterByPrice(69999)}>
            69999
          </div>
          <div className="items" onClick={() => filterByPrice(89999)}>
            89999
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
