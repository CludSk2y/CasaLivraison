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
      if (!product)
        return res.status(404).json({ message: "Product not found" });

      itemsForCalc.push({ price: product.price, quantity: item.quantity });

      orderItemsData.push({
        ProductId: product.id,
        quantity: item.quantity,
        price: product.price,
      });
    }

    const { subtotal, deliveryFee, total } = calculateTotal(itemsForCalc);

    const order = await Order.create({
      UserId: userId,
      totalAmount: total,
      address,
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
      total: total,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
