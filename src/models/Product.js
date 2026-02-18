const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  description: { type: DataTypes.TEXT },
  image: { type: DataTypes.STRING },
  category: { type: DataTypes.STRING },
  restaurantId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: "Restaurants",
      key: "id",
    },
  },
});

module.exports = Product;
