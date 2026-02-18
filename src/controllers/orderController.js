const { Order, OrderItem, Product } = require("../models");
const calculateTotal = require("../utils/calculateTotal");

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
    });

    const finalItems = orderItemsData.map((item) => ({
      ...item,
      OrderId: order.id,
    }));
    await OrderItem.bulkCreate(finalItems);

    res.status(201).json({
      message: "Order confirmed! 🚀",
      orderId: order.id,
      paymentSummary: {
        subtotal,
        deliveryFee,
        total: finalTotal,
      },
      status: order.status,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.findAll({
      where: { UserId: userId },
      include: [
        {
          model: OrderItem,
          attributes: ["quantity", "price"],
          include: [
            {
              model: Product,
              attributes: ["name", "image", "category"],
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.status(200).json({
      message: `Order status updated to ${status} ✅`,
      order,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      attributes: ["id", "name", "price", "image"],
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
