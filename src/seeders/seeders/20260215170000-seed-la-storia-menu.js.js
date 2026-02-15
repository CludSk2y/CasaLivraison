"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const [restaurant] = await queryInterface.bulkInsert(
      "Restaurants",
      [
        {
          name: "LA STORIA",
          address: "Gauthier, Casablanca",
          rating: 4.8,
          deliveryTime: "25-35 min",
          image: "https://your-image-url.com/storia.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: true },
    );

    return queryInterface.bulkInsert("Products", [
      {
        name: "Truffle-infused Burrata",
        price: 90.0,
        category: "Starters",
        restaurantId: restaurant.id,
        description: "Creamy artisan Burrata, black truffle essence.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Gold-Leaf Wagyu Burger",
        price: 290.0,
        category: "Signature",
        restaurantId: restaurant.id,
        description: "Elite Wagyu beef patty, 24k gold leaf garnish.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Pistachio Croissant",
        price: 65.0,
        category: "Bakery",
        restaurantId: restaurant.id,
        description: "Rich Sicilian pistachio cream.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Saffron Latte",
        price: 55.0,
        category: "Roastery",
        restaurantId: restaurant.id,
        description: "Slow-roasted Arabic infused with saffron.",
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
