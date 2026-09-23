import mongoose from "mongoose";
import dotenv from "dotenv";
import product from "../models/products.model.js"; // adjust path
import dummyProducts from "../../dummyProducts.js"; // the array from before

dotenv.config();

const seedDB = async() => {
  try {
    await mongoose.connect(process.env.MONGODB_URI); // your connection string
    console.log("Connected to MongoDB");

    // Optional: clear existing data first
    // await productModel.deleteMany({});

    const inserted = await product.insertMany(dummyProducts);
    console.log(`Inserted ${inserted.length} products`);

    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

export default seedDB;