import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    brand: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: ["Men", "Women", "Kids"],
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    discountedPrice: {
      type: Number,
      min: 0,
    },

    images: [
      {
        type: String,
        required: true,
      },
    ],

    color: {
      type: String,
      trim: true,
    },

    material: {
      type: String,
      trim: true,
    },

    type: {
      type: String,
      trim: true,
    },

    movement: {
      type: String,
      trim: true,
    },

    strapType: {
      type: String,
      trim: true,
    },

    waterResistance: {
      type: String,
    },

    warranty: {
      type: String,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isAvailable: {
      type: String,
      enum: ["In Stock", "Out of Stock", "Coming Soon"],
      default: "In Stock",
    },
  },
  {
    timestamps: true,
  },
);

const product = mongoose.model("Product", productSchema);

export default product;
