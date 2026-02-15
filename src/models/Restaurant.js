const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Restaurant = sequelize.define("Restaurant", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  phone: {
    type: DataTypes.STRING,
  },
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 0, 
  },
  image: {
    type: DataTypes.STRING, 
  },
  deliveryTime: {
    type: DataTypes.STRING,
    defaultValue: "25-35 min",
  },
  description: {
    type: DataTypes.TEXT,
  },
});

module.exports = Restaurant;
