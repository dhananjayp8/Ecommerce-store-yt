// import { Payment } from "../Models/Payment.js";
// import dotenv from "dotenv";
// dotenv.config();
// import { v4 as uuidv4 } from "uuid";
// import Stripe from "stripe";
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// // console.log(process.env.STRIPE_SECRET_KEY);
// export const checkout = async (req, res) => {
//   const { amount, cartItems, userShipping, userId } = req.body;

//   try {
//     const orderId = `order_${uuidv4()}`;
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: amount * 100, // amount is in cents
//       currency: "usd",
//       payment_method_types: ["card"],
//       metadata: {
//         userId,
//         cartItems: JSON.stringify(cartItems),
//         userShipping: JSON.stringify(userShipping),
//         receipt: `receipt_${Date.now()}`, // add the receipt here
//       },
//     });

//     res.json({
//       clientSecret: paymentIntent.client_secret,
//       orderId,
//       amount: amount,
//       cartItems,
//       userShipping,
//       userId,
//       payStatus: "created",
//       receipt: `receipt_${Date.now()}`, // return the receipt in the response if needed
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const verify = async (req, res) => {
//   const { paymentIntentId, orderItems, userId, userShipping } = req.body;

//   try {
//     const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

//     if (paymentIntent.status === "succeeded") {
//       let orderConfirm = await Payment.create({
//         orderId: paymentIntent.id,
//         paymentId: paymentIntent.payment_method,
//         amount: paymentIntent.amount / 100, // convert from cents
//         orderItems,
//         userId,
//         userShipping,
//         payStatus: "paid",
//       });

//       res.json({
//         message: "Payment successful.",
//         success: true,
//         orderConfirm,
//       });
//     } else {
//       res
//         .status(400)
//         .json({ message: "Payment not successful.", success: false });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // export const createPaymentIntent = async (req, res) => {
// //   const { amount, cartItems, userShipping, userId } = req.body;

// //   try {
// //     const paymentIntent = await stripe.paymentIntents.create({
// //       amount: amount * 100, // Amount is in cents
// //       currency: "usd",
// //       metadata: {
// //         userId,
// //         cartItems: JSON.stringify(cartItems),
// //         userShipping: JSON.stringify(userShipping),
// //       },
// //     });

// //     res.json({ clientSecret: paymentIntent.client_secret });
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // };
import { Payment } from "../Models/Payment.js";
import dotenv from "dotenv";
import Stripe from "stripe";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const checkout = async (req, res) => {
  const { amount, cartItems, userShipping, userId } = req.body;

  try {
    // Generate an order ID for reference
    const orderId = `order_${uuidv4()}`;
    const description = `Export transaction for goods purchased by user ${userId}`;
    // Create a Payment Intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Amount in cents
      currency: "INR",
      payment_method_types: ["card"],
      description,
      metadata: {
        orderId,
        userId,
        cartItems: JSON.stringify(cartItems),
        userShipping: JSON.stringify(userShipping),
        receipt: `receipt_${Date.now()}`,
      },
    });

    // Send back clientSecret and orderId to the client
    res.json({
      clientSecret: paymentIntent.client_secret,
      orderId,
      amount,
      cartItems,
      userShipping,
      userId,
      payStatus: "created",
      receipt: `receipt_${Date.now()}`,
    });
  } catch (error) {
    console.error("Error in creating payment intent:", error.message);
    res.status(500).json({ error: "Failed to create payment intent." });
  }
};
export const verify = async (req, res) => {
  const { paymentIntentId, orderItems, userId, userShipping } = req.body;

  try {
    // Retrieve the payment intent details from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    // Check if the payment was successful
    if (paymentIntent.status === "succeeded") {
      // Store the payment information in your database
      const orderConfirm = await Payment.create({
        orderId: paymentIntent.id,
        paymentId: paymentIntent.payment_method,
        amount: paymentIntent.amount / 100, // Convert from cents to dollars
        orderItems,
        userId,
        userShipping,
        payStatus: "paid",
      });

      // Send success response
      res.json({
        message: "Payment successful.",
        success: true,
        orderConfirm,
      });
    } else {
      res.status(400).json({
        message: "Payment not successful.",
        success: false,
      });
    }
  } catch (error) {
    console.error("Error in verifying payment:", error.message);
    res.status(500).json({ error: "Failed to verify payment." });
  }
};
