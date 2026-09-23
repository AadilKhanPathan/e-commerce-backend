import productModel from "../models/products.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export async function addItem(req, res) {
  try {
    const {
      name,
      description,
      brand,
      category,
      price,
      discountedPrice,
      color,
      material,
      movement,
      strapType,
      waterResistance,
      warranty,
      isFeatured,
      isAvailable,
    } = req.body;

    if (!name || !brand || !category || price === undefined) {
      return res.status(400).json({
        success: false,
        message: "name, brand, category, and price are required fields",
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "upload at least one image",
      });
    }

    // Upload images
    const uploadResults = await Promise.all(
      req.files.map((file) => uploadOnCloudinary(file.path)),
    );
    const imageUrls = uploadResults.filter((url) => url !== null);

    const product = await productModel.create({
      name,
      description,
      brand,
      category,
      price,
      discountedPrice,
      images: imageUrls,
      color,
      material,
      movement,
      strapType,
      waterResistance,
      warranty,
      isFeatured,
      isAvailable,
    });

    return res.status(201).json({
      success: true,
      message: "Product is added successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "product is not added",
      error: error.message,
    });
  }
}

// get a single item
export async function getItem(req, res) {
  try {
    const { id } = req.params; // or req.query, depending on your route

    const item = await productModel.findById(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    return res.status(200).json({
      success: true,
      item,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch the item",
      error: error.message,
    });
  }
}

// get list of items
export async function listItem(req, res) {
  try {
    const list = await productModel.find({});

    return res.status(200).json({
      success: true,
      message: list.length ? "List of products" : "No products found",
      list,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch products",
      error: error.message,
    });
  }
}

// remove an item
export async function removeItem(req, res) {
  try {
    const { id } = req.params;

    const removedProduct = await productModel.findByIdAndDelete(id);

    if (!removedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product removed successfully",
      removedItem: removedProduct,
    });
  } catch (error) {
    console.error("Error removing a product:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to remove a product",
      error: error.message,
    });
  }
}

