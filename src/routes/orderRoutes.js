const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/:id", orderController.getOrderById);

router.post("/", authMiddleware, orderController.createOrder);
router.get("/my-orders", authMiddleware, orderController.getUserOrders);
router.patch("/:id/tracking", authMiddleware, orderController.updateTracking);

module.exports = router;
