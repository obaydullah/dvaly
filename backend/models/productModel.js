import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

// _id: 5,
// name: "shirt 5",
// img: "/images/5.jpg",
// price: "200",
// description:
//   "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
// rating: 2,
// numberOfRating: 10,
// inStock: 0,
