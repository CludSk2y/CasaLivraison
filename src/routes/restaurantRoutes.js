const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");


router.get("/storia/menu", restaurantController.getMenu);

module.exports = router;
