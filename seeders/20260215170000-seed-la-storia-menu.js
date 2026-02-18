"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const restaurantId = "b3481da0-9460-4e0c-b3a3-e93e0d577944";

    await queryInterface.bulkInsert("Restaurants", [
      {
        id: restaurantId,
        name: "LA STORIA",
        address: "Gauthier, Casablanca",
        rating: 4.8,
        deliveryTime: "25-35 min",
        description: "Timeless Italian classics served in an elegant",
        image: "https://i.ibb.co/jm2T4jg/La-Storia-png.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    return queryInterface.bulkInsert("Products", [
      {
        id: "8cb71d07-6c20-4556-99cb-2a8d25a6ffeb",
        name: "Truffle-Infused Burrata",
        price: 90.0,
        category: "Starters",
        restaurantId: restaurantId,
        description:
          "Creamy artisan Burrata, black truffle  essence, and aged balsamic glaze.",
        image: "https://i.ibb.co/39Yb5G8y/Truffle-Infused-Burrata-png.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "bf63ce85-6cac-49c9-97dd-96663d0c3c10",
        name: "Gold-Leaf Wagyu Burger",
        price: 290.0,
        category: "Signature",
        restaurantId: restaurantId,
        description: "Elite Wagyu beef patty, garnish, and truffle aioli.",
        image: "https://i.ibb.co/qLNXW961/Gold-Leaf-Wagyu-Burger-png.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "0991d3a5-e83a-47cd-8370-c03d2a2edf63",
        name: "Pistachio Croissant",
        price: 65.0,
        category: "Bakery",
        restaurantId: restaurantId,
        description: "Rich Italian pistachio cream.",
        image: "https://i.ibb.co/xkKydBq/Pistachio-Croissant-png.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "b86ddacd-5be1-4ed2-b993-ffd0500ea56b",
        name: "Saffron Latte",
        price: 55.0,
        category: "Roastery",
        restaurantId: restaurantId,
        description:
          "Slow-roasted Arabic infused with Saffon and velvety milk foam.",
        image: "https://i.ibb.co/HLywJD7Q/Saffron-Latte-png.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Products", null, {});
    await queryInterface.bulkDelete("Restaurants", null, {});
  },
};
