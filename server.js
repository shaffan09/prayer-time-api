const express = require("express");
const cors = require("cors");
const sequelize = require("./db_config.js");
require('dotenv').config({ path: './.env' });

// app
const app = express();

// port
const port = process.env.PORT || 6000;

// middlewares
app.use(cors());
app.use(express.json());

// routes
const islandRoute = require("./routes/island.js");
const prayerTime = require('./routes/prayer_time.js');

// registering routes
app.use("/islands", islandRoute);
app.use('/prayerTime', prayerTime);

// connecting to database and syncing
sequelize
  .sync()
  .then(() => {
    console.log("Database Synced");
  })
  .catch((err) => {
    console.log("Failed to sync the Database " + err.message);
  });

// starting the application
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
