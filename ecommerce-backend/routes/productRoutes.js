const express = require("express");
const Product = require("../models/Product");

const router = express.Router();
router.post("/add", async (req, res) => {

  const {
    name,
    price,
    category,
    description
  } = req.body;

  const product = new Product({
    name,
    price,
    category,
    description
  });

  await product.save();

  res.json({
    message: "Product Added"
  });

});
router.get("/", async (req, res) => {

  const products =
  await Product.find();

  res.json(products);

});
router.put(
  "/update/:id",
  async (req, res) => {

    await Product.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    res.json({
      message:"Product Updated"
    });

});
router.delete(
  "/delete/:id",
  async (req, res) => {

    await Product.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Product Deleted"
    });

});
module.exports = router;