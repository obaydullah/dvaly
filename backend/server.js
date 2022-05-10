import express from "express";
import cors from "cors";
import data from "./data.js";

const app = express();

app.use(cors());

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
