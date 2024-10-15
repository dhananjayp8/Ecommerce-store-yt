import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import TableProduct from "./TableProduct";
import axios from "axios";
const Checkout = () => {
  const { cart, userAddress, url, user } = useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  useEffect(() => {
    let qty = 0;
    let price = 0;
    if (cart?.items) {
      for (let i = 0; i < cart.items?.length; i++) {
        qty += cart.items[i].qty;
        price += cart.items[i].price;
      }
    }
    setPrice(price);
    setQty(qty);
  }, [cart]);
  console.log("cart-items", cart?.items);
  console.log("user-address", userAddress);
  console.log("user-id", user._id);
  console.log("Price", price);
  const handlePayment = async () => {
    console.log("Api called");
    try {
      const orderResponse = await axios.post(`${url}/payment/checkout`, {
        amount: price,
        cartItems: cart?.items,
        userShipping: userAddress,
        userId: user._id,
      });
      console.log("order response", orderResponse);
    } catch (err) {
      console.log(err.response ? err.response.data : err.message);
    }
  };
  //   console.log("user address :-", userAddress);
  return (
    <>
      <div className="container my-3">
        <h1 className="text-center">Order Summary</h1>
        <table className="table table-bordered border-primary bg-dark">
          <thead className="bg-dark">
            <tr>
              <th scope="col" className="bg-dark text-light text-center">
                Product Details
              </th>

              <th scope="col" className="bg-dark text-light text-center">
                Shipping Address
              </th>
            </tr>
          </thead>
          <tbody className="bg-dark">
            <tr>
              <td className="bg-dark text-light">
                <TableProduct cart={cart} />
              </td>
              <td className="bg-dark text-light">
                <ul style={{ fontWeight: "bold" }}>
                  <li>Name :{userAddress?.fullName}</li>
                  <li>Phone :{userAddress?.phoneNumber}</li>
                  <li>Country :{userAddress?.country}</li>
                  <li>State :{userAddress?.state}</li>
                  <li>PinCode :{userAddress?.pincode}</li>
                  <li>Near By :{userAddress?.address}</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="container text-center my-5">
        <button className="btn btn-secondary btn-lg" onClick={handlePayment}>
          Proceed to Pay
        </button>
      </div>
    </>
  );
};

export default Checkout;
