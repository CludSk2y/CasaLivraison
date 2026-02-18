const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/products/list", orderController.getAllProducts);
router.post("/", authMiddleware, orderController.createOrder);
router.get("/my-orders", authMiddleware, orderController.getUserOrders);
router.patch("/:id/status", authMiddleware, orderController.updateOrderStatus);

module.exports = router;
