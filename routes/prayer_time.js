const express = require('express');
const router = express.Router();
const prayerTime = require('../controllers/prayer_time.js');

router.get('/', prayerTime.getPrayerTime);

module.exports = router;