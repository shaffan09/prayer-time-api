const { DataTypes } = require("sequelize");
const sequelize = require("../db_config.js");

const Island = sequelize.define(
  "Island",
  {
    IslandId: {
      type: DataTypes.INTEGER,
    },
    Island: {
      type: DataTypes.STRING,
    },
    Atoll: {
      type: DataTypes.STRING,
    },
    CategoryId: {
      type: DataTypes.INTEGER,
    },
    Minutes: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: 'Island',
  }
);

module.exports = Island;
