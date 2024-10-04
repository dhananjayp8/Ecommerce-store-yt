import express from "express";
import mongoose from "mongoose";
import bodyParser from "express";

import userRouter from "./Routes/user.js";
import productRouter from "./Routes/product.js";
import cartRouter from "./Routes/cart.js";
import addressRouter from "./Routes/address.js";
const app = express();
app.use(bodyParser.json());
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
