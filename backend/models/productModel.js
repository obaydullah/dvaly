import mongoose from "mongoose";

let productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    img: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    rating: Number,
    numberOfRating: Number,
    inStock: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    cupon: String,
    discount: Number,
    discountLimit: Number,
    brand: String,
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
