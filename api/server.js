import express from "express";
import mongoose from "mongoose";
import bodyParser from "express";
import userRouter from "./Routes/user.js";
import productRouter from "./Routes/product.js";
import cartRouter from "./Routes/cart.js";
import addressRouter from "./Routes/address.js";
import dotenv from "dotenv";
dotenv.config();
import paymentRouter from "./Routes/payment.js";
import cors from "cors";

const app = express();
app.use(bodyParser.json());

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
//home route
app.get("/", (req, res) => {
  res.json({ message: "this is home route" });
});
//user router
app.use("/api/user", userRouter);

//product router
app.use("/api/product", productRouter);

//cart router

app.use("/api/cart", cartRouter);

//address router

app.use("/api/address", addressRouter);

//checkout
app.use("/api/payment", paymentRouter);

const db =
  "mongodb+srv://dhananjaypuranik8:dhananjay@cluster0.n67j8.mongodb.net/";
mongoose
  .connect(db, {
    dbName: "Mern-Ecom",
  })
  .then(() => console.log("Mongodb started"))
  .catch((err) => console.log(err));

const port = 6001;

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
