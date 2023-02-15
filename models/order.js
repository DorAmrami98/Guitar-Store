const { DataTypes } = require("sequelize");
const sequelize = require("../database.js");
const User = require("./user");
const Guitar = require("./guitar");

const Order = sequelize.define("Order", {
});

Order.belongsTo(User);
Order.belongsTo(Guitar);

module.exports = Order;