import express from "express";
import cors from "cors";
import data from "./data.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();
dotenv.config();

app.use(cors());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/products", function (req, res) {
  res.send(data);
});
app.get("/products/:slug", function (req, res) {
  let products = data.find((product) => {
    return product.name == req.params.slug;
  });
  res.send(products);
});
app.get("/products/:id", function (req, res) {
  let products = data.find((product) => {
    return product._id == req.params.id;
  });
  res.send(products);
});

let port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log("this is project is running on 8000 port");
});
