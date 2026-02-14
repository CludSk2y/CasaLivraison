const sequelize = require("../config/database");
const User = require("./User");
const Product = require("./Product");
const Restaurant = require("./Restaurant");
const Order = require("./Order");

User.hasMany(Order);
Order.belongsTo(User);

Restaurant.hasMany(Product);
Product.belongsTo(Restaurant);

const initDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connection to Postgres has been established successfully.");

    
    await sequelize.sync({ alter: true });
    console.log("✅ All models were synchronized successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
};

module.exports = {
  sequelize,
  User,
  Product,
  Restaurant,
  Order,
  initDb,
};
