const { DataTypes } = require("sequelize");
const sequelize = require("../db_config.js");

const PrayerDateTimes = sequelize.define(
  "PrayerTimes",
  {
    CategoryId: {
      type: DataTypes.INTEGER,
    },
    Date: {
      type: DataTypes.INTEGER,
    },
    Fajuru: {
      type: DataTypes.INTEGER,
    },
    Sunrise: {
      type: DataTypes.INTEGER,
    },
    Dhuhr: {
      type: DataTypes.INTEGER,
    },
    Asr: {
      type: DataTypes.INTEGER,
    },
    Maghrib: {
      type: DataTypes.INTEGER,
    },
    Isha: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: 'PrayerTimes',
  }
);

module.exports = PrayerDateTimes;
