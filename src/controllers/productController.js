const { Product } = require("../models");

exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, category, image, restaurantId } =
      req.body;

    const newProduct = await Product.create({
      name,
      price,
      description,
      category,
      image,
      restaurantId, 
    });

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Product.update(req.body, { where: { id } });
    if (updated) {
      const updatedProduct = await Product.findByPk(id);
      return res.status(200).json(updatedProduct);
    }
    throw new Error("Product not found");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.destroy({ where: { id } });
    if (deleted) return res.status(204).send("Product deleted");
    throw new Error("Product not found");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
