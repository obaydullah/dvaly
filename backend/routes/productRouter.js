import express from "express";
import Product from "../models/productModel.js";

const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  const product = await Product.find();
  res.send(product);
});

productRouter.get("/:slug", async function (req, res) {
  let product = await Product.findOne({ name: req.params.slug });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ msg: "product not found" });
  }
});

export default productRouter;
