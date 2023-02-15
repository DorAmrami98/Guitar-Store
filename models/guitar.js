const { DataTypes } = require("sequelize");
const sequelize = require("../database.js");

const Guitar = sequelize.define("Guitar", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    manufacturer: {
      type: DataTypes.STRING,
      allowNull: false
    },
    number_of_strings: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    wood_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    frets: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {timestamps: false});
  
  module.exports = Guitar;
  