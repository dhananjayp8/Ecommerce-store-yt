// PaymentPage.jsx
// import React, { useContext, useState } from "react";
// import AppContext from "../context/AppContext";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   Elements,
//   CardElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// // Load your Stripe public key
// const stripePromise = loadStripe(
//   "pk_test_51P67DlSJ0zgqnuATNqgm76vfk1ItcmnAKO6VbPLgaMvETGg5l17FHFsKOk0dSv6mcRsYtanURYHJT8Dac8lFPTud00mfEiu6kc"
// );

// const PaymentForm = () => {
//   const { cart, userAddress, url, user } = useContext(AppContext);
//   const stripe = useStripe();
//   const elements = useElements();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handlePayment = async () => {
//     if (!stripe || !elements) return;

//     setLoading(true);
//     try {
//       // Request backend to create payment intent
//       const { data } = await axios.post(`${url}/payment/checkout`, {
//         amount: cart.totalPrice, // Assume cart has totalPrice
//         cartItems: cart.items,
//         userShipping: userAddress,
//         userId: user._id,
//       });

//       const { clientSecret, orderId } = data;

//       // Confirm the payment using Stripe.js
//       const result = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//           billing_details: {
//             name: user.fullName,
//             email: user.email,
//             address: {
//               line1: userAddress.address,
//               postal_code: userAddress.pincode,
//               city: userAddress.city,
//               state: userAddress.state,
//               country: userAddress.country,
//             },
//           },
//         },
//       });

//       if (result.error) {
//         setError(result.error.message);
//       } else if (result.paymentIntent.status === "succeeded") {
//         navigate(`/orderconfirmation/${orderId}`);
//       }
//     } catch (error) {
//       setError("Payment failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container text-center my-5">
//       <h1>Complete Payment</h1>
//       <div className="card">
//         <CardElement />
//       </div>
//       <button
//         className="btn btn-primary my-3"
//         onClick={handlePayment}
//         disabled={loading}
//       >
//         {loading ? "Processing..." : "Pay Now"}
//       </button>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//     </div>
//   );
// };

// const Payment = () => {
//   return (
//     <Elements stripe={stripePromise}>
//       <PaymentForm />
//     </Elements>
//   );
// };

// export default Payment;
import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";

// Load Stripe with your public key
const stripePromise = loadStripe(
  "pk_test_51P67DlSJ0zgqnuATNqgm76vfk1ItcmnAKO6VbPLgaMvETGg5l17FHFsKOk0dSv6mcRsYtanURYHJT8Dac8lFPTud00mfEiu6kc"
);

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { cart, userAddress, user, url } = useContext(AppContext);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let total = 0;
    if (cart?.items) {
      for (let i = 0; i < cart.items.length; i++) {
        total += cart.items[i].price * cart.items[i].qty;
      }
    }
    setPrice(total);
  }, [cart]);

  const handlePayment = async () => {
    if (!stripe || !elements) return; // Stripe.js has not loaded yet

    try {
      const { data } = await axios.post(`${url}/payment/checkout`, {
        amount: price,
        cartItems: cart.items,
        userShipping: userAddress,
        userId: user._id,
      });

      const { clientSecret, orderId } = data;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: userAddress.fullName,
            email: user.email,
            address: {
              line1: userAddress.address,
              postal_code: userAddress.pincode,
              city: userAddress.city,
              state: userAddress.state,
              country: "IN",
            },
          },
        },
      });

      if (result.error) {
        console.log(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        console.log("Payment successful!");
        navigate(`/orderconfirmation/`);
      }
    } catch (error) {
      console.log("Error during payment:", error);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center my-4">Enter Payment Details</h2>
      <div className="card p-4">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-primary mt-4"
          onClick={handlePayment}
          disabled={!stripe}
        >
          Pay
        </button>
      </div>
    </div>
  );
};

const PaymentPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default PaymentPage;
