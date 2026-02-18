const sequelize = require("../config/database");
const User = require("./User");
const Product = require("./Product");
const Restaurant = require("./Restaurant");
const Order = require("./Order");
const OrderItem = require("./OrderItem");


Restaurant.hasMany(Product, { foreignKey: "restaurantId", as: "products" });
Product.belongsTo(Restaurant, { foreignKey: "restaurantId" });

User.hasMany(Order);
Order.belongsTo(User);

Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);
OrderItem.belongsTo(Product);

const initDb = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("✅ Database Synced");
  } catch (error) {
    console.error("❌ DB Error:", error);
  }
};

module.exports = {
  sequelize,
  User,
  Product,
  Restaurant,
  Order,
  OrderItem,
  initDb,
};
