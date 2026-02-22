const { Order, OrderItem, Product } = require("../models");
const calculateTotal = require("../utils/calculateTotal");

exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id, {
      include: [
        {
          model: OrderItem,
          include: [{ model: Product, attributes: ["name", "price", "image"] }],
        },
      ],
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { items, address } = req.body;
    const userId = req.user.id;

    let orderItemsData = [];
    let itemsForCalc = [];

    for (const item of items) {
      const product = await Product.findByPk(item.id);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product not found: ${item.id}` });
      }
      itemsForCalc.push({ price: product.price, quantity: item.quantity });
      orderItemsData.push({
        ProductId: product.id,
        quantity: item.quantity,
        price: product.price,
      });
    }

    const { total: subtotal } = calculateTotal(itemsForCalc);
    const deliveryFee = 45;
    const finalTotal = subtotal + deliveryFee;

    const order = await Order.create({
      UserId: userId,
      totalAmount: finalTotal,
      address: address || "Anfa, Gauthier Casablanca",
      status: "pending",
      deliveryLat: 33.5731,
      deliveryLng: -7.5898,
    });

    const finalItems = orderItemsData.map((item) => ({
      ...item,
      OrderId: order.id,
    }));
    await OrderItem.bulkCreate(finalItems);

    res.status(201).json({
      message: "Order confirmed! 🚀",
      orderId: order.id,
      paymentSummary: { subtotal, deliveryFee, total: finalTotal },
      status: order.status,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTracking = async (req, res) => {
  try {
    const { id } = req.params;
    const { lat, lng, livreurName, livreurPhone, status } = req.body;

    const order = await Order.findByPk(id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (lat) order.deliveryLat = lat;
    if (lng) order.deliveryLng = lng;
    if (livreurName) order.livreurName = livreurName;
    if (livreurPhone) order.livreurPhone = livreurPhone;
    if (status) order.status = status;

    await order.save();
    res.status(200).json({ message: "Tracking updated! 📍", order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.findAll({
      where: { UserId: userId },
      include: [{ model: OrderItem, include: [Product] }],
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
