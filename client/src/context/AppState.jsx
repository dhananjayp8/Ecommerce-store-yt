import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";
const AppState = (props) => {
  const data = 10;
  const url = "http://localhost:6001/api";
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const api = await axios.get(`${url}/product/allProducts`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(api.data.products);
      setProducts(api.data.products);
    };
    fetchProducts();
  }, []);

  //register user

  const register = async (name, email, password) => {
    const api = await axios.post(
      `${url}/user/register`,
      { name, email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    alert(api.data.message);
    console.log("user registered", api);
  };

  return (
    <AppContext.Provider value={{ products, register }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
