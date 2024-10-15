import { Payment } from "../Models/Payment.js";
import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// console.log(process.env.STRIPE_SECRET_KEY);
export const checkout = async (req, res) => {
  const { amount, cartItems, userShipping, userId } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // amount is in cents
      currency: "usd",
      payment_method_types: ["card"],
      metadata: {
        userId,
        cartItems: JSON.stringify(cartItems),
        userShipping: JSON.stringify(userShipping),
        receipt: `receipt_${Date.now()}`, // add the receipt here
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      amount: amount,
      cartItems,
      userShipping,
      userId,
      payStatus: "created",
      receipt: `receipt_${Date.now()}`, // return the receipt in the response if needed
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const verify = async (req, res) => {
  const { paymentIntentId, orderItems, userId, userShipping } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === "succeeded") {
      let orderConfirm = await Payment.create({
        orderId: paymentIntent.id,
        paymentId: paymentIntent.payment_method,
        amount: paymentIntent.amount / 100, // convert from cents
        orderItems,
        userId,
        userShipping,
        payStatus: "paid",
      });

      res.json({
        message: "Payment successful.",
        success: true,
        orderConfirm,
      });
    } else {
      res
        .status(400)
        .json({ message: "Payment not successful.", success: false });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
