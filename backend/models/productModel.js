const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    productName: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
    },
    // sku: {
    //   type: String,
    //   required: true,
    //   default: "SKU",
    //   trim: true,
    // },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'ProductCategory',
      required: [true, "Please add a category"],
    },
    quantity: {
      type: String,
      required: [true, "Please add a quantity"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Please add a price"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
      trim: true,
    },
    image: {
      type: Object,
      default: {},
      required: [true, "Please add an image"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
