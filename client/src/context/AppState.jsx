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
  return (
    <AppContext.Provider value={{ products }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
