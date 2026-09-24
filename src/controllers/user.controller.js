import product from "../models/products.model.js";

// get item by category
export async function getItemByCategory(req, res) {
  try {
    const { category } = req.params;
    const data = await product.find({ category });

    return res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "could not get the element",
      error: error.message,
    });
  }
}
