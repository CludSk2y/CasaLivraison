const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");

router.get("/", restaurantController.getRestaurants);

router.get("/storia/menu", restaurantController.getMenuByCategory);

module.exports = router;
