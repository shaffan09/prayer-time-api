const { Sequelize } = require('sequelize');
require('dotenv').config({ path: './.env' });

const dbName = process.env.DB_NAME;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dialect = process.env.DIALECT;

// connecting to the database
const sequelize = new Sequelize(dbName, username, password, {
  host: dbHost,
  dialect: dialect,
});

// authenticating the connection
sequelize
  .authenticate()
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Error: ", err));

module.exports = sequelize;
