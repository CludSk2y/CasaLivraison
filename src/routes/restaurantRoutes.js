const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");

router.get("/", restaurantController.getAllRestaurants);
router.get("/menu", restaurantController.getMenu);
router.post("/", restaurantController.createRestaurant);

module.exports = router;
