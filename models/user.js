const { DataTypes } = require("sequelize");
const sequelize = require("../database.js");

const User = sequelize.define("User", {
  full_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {timestamps: false});

module.exports = User;