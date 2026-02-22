"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const restaurantId = "b3481da0-9460-4e0c-b3a3-e93e0d577944";
    const userId = "a1111111-2222-3333-4444-555555555555";
    const orderId = "f5d50b9a-1234-5678-9101-112131415161";

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

    await queryInterface.bulkInsert("Products", [
      {
        id: "8cb71d07-6c20-4556-99cb-2a8d25a6ffeb",
        name: "Truffle-Infused Burrata",
        price: 90.0,
        category: "Starters",
        restaurantId: restaurantId,
        description:
          "Creamy artisan Burrata, black truffle essence, and aged balsamic glaze.",
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

    await queryInterface.bulkInsert("Users", [
      {
        id: userId,
        username: "testuser",
        email: "test@example.com",
        password: "hashed_password_example",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("Orders", [
      {
        id: orderId,
        UserId: userId,
        totalAmount: 145.0,
        address: "Anfa, Gauthier Casablanca",
        status: "on_the_way",
        deliveryLat: 33.5824,
        deliveryLng: -7.6325,
        livreurName: "Karim",
        livreurPhone: "0600112233",
        livreurImage: "https://i.ibb.co/S7sPJ3rW/livreure-png.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    return;
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Orders", null, {});
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.bulkDelete("Products", null, {});
    await queryInterface.bulkDelete("Restaurants", null, {});
  },
};
