import express from "express";
import mongoose from "mongoose";
const app = express();
const db =
  "mongodb+srv://Ecom-Mern:dhananjay@cluster0.e01xo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(db, {
    dbName: "Mern-Ecom",
  })
  .then(() => console.log("Mongodb started"))
  .catch((err) => console.log(err));

const port = 6000;

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
