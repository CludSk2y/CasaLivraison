const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/restaurants", restaurantRoutes);

app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("🚀 CasaLivraison API is running...");
});

module.exports = app;
