import express from "express";
import cors from "cors";
import data from "./data.js";
import discount from "./discount.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import seedRouter from "./routes/seedRoutes.js";
import productRouter from "./routes/productRouter.js";
import userRouter from "./routes/userRouter.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/seed", seedRouter);
app.use("/products", productRouter);
app.use("/api/users", userRouter);

// app.get("/products/:slug", function (req, res) {
//   let products = data.find((product) => {
//     return product.name == req.params.slug;
//   });
//   res.send(products);
// });

app.get("/discount", function (req, res) {
  res.send(discount);
});

// app.get("/products/:id", function (req, res) {
//   let products = data.find((product) => {
//     return product._id == req.params.id;
//   });
//   res.send(products);
// });

let port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log("this is project is running on 8000 port");
});
