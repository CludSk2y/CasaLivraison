const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");

router.post("/", restaurantController.createRestaurant); 
router.get("/menu", restaurantController.getMenu);

module.exports = router;
