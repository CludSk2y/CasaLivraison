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
    await sequelize.sync({ force: true });

    const restaurantId = "b3481da0-9460-4e0c-b3a3-e93e0d577944";
    const userId = "a1111111-2222-3333-4444-555555555555";
    const orderId = "f5d50b9a-1234-5678-9101-112131415161";

    await Restaurant.create({
      id: restaurantId,
      name: "LA STORIA",
      address: "Gauthier, Casablanca",
      rating: 4.8,
      image: "https://i.ibb.co/jm2T4jg/La-Storia-png.jpg",
    });

    await User.create({
      id: userId,
      username: "amine_dev",
      fullName: "Amine Developer",
      email: "amine.dev@gmail.com",
      password: "password123",
    });

    await Order.create({
      id: orderId,
      UserId: userId,
      address: "Gauthier, Casablanca, Rue 123",
      totalAmount: 380.0,
      status: "on_the_way",
      orderDate: new Date(),
      livreurName: "Karim",
      livreurPhone: "0600112233",
      livreurImage: "https://i.ibb.co/S7sPJ3rW/livreure-png.jpg",
    });

    console.log("✅ Database Synced & Seeded Automatically!");
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
