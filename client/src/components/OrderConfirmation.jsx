// OrderConfirmation.jsx
import React from "react";
import { useParams } from "react-router-dom";

const OrderConfirmation = () => {
  const { orderId } = useParams();

  return (
    <div className="container text-center my-5">
      <h1>Thank You for Your Order!</h1>
      <p>Your order ID is: {orderId}</p>
      <p>We have received your payment and are processing your order.</p>
    </div>
  );
};

export default OrderConfirmation;
