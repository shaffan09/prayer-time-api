const { DataTypes } = require("sequelize");
const sequelize = require("../db_config.js");

const PrayerDateTimes = sequelize.define(
  "PrayerTimes",
  {
    Fajuru: {
      type: DataTypes.DATE,
    },
    Sunrise: {
      type: DataTypes.DATE,
    },
    Dhuhr: {
      type: DataTypes.DATE,
    },
    Asr: {
      type: DataTypes.DATE,
    },
    Maghrib: {
      type: DataTypes.DATE,
    },
    Isha: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: 'PrayerTimes',
  }
);

module.exports = PrayerDateTimes;
