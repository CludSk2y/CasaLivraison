const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Order = sequelize.define("Order", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM(
      "pending", 
      "preparing", 
      "on_the_way", 
      "delivered",
      "cancelled", 
    ),
    defaultValue: "pending",
  },
  deliveryLat: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  deliveryLng: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  livreurName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  livreurPhone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Order;
