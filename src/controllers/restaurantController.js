const { Restaurant, Product } = require("../models");

exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll();
    res.status(200).json(restaurants);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching restaurants", error: error.message });
  }
};

exports.createRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.create(req.body);
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getMenu = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({
      where: { name: "LA STORIA" },
      include: [{ model: Product, as: "products" }],
    });

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const categorizedMenu = {
      id: restaurant.id,
      name: restaurant.name,
      address: restaurant.address,
      rating: restaurant.rating,
      image: restaurant.image,
      menu: {
        Starters: restaurant.products.filter((p) => p.category === "Starters"),
        Signature: restaurant.products.filter(
          (p) => p.category === "Signature",
        ),
        Bakery: restaurant.products.filter((p) => p.category === "Bakery"),
        Roastery: restaurant.products.filter((p) => p.category === "Roastery"),
      },
    };

    res.status(200).json(categorizedMenu);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
