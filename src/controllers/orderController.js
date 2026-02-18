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

    const { total } = calculateTotal(itemsForCalc);

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

exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.findAll({
      where: { UserId: userId },
      include: [
        {
          model: OrderItem,
          include: [
            {
              model: Product,
              attributes: ["name", "price", "category"],
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
