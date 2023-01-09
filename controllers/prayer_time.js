const { Op } = require('sequelize');
const Island = require('../models/island.js');
const PrayerTimes = require('../models/prayer_time.js');

module.exports.getPrayerTime = async (req, res) => {
    let date = req.query.date;
    const islandId = req.query.islandId;

    if (date === '' || date === undefined || islandId === '' || islandId === undefined) {
        res.status(400).json({ message: 'Query is missing!' });
        return
    }

    date = new Date(date);

    try {
        const island = await Island.findOne({
            attributes: ["IslandId", "Island", "Atoll", "CategoryId", "Minutes"],
            where: { IslandId: islandId }
        });

        // if no island found
        if (island === null) {
            res.status(404).json({
                message: "Invalid islandID passed!",
            });
            return;
        }

        const dayNo = getDayOfYear(date) - 1;

        const prayerTimes = await PrayerTimes.findOne({
            attributes: ['CategoryId', 'Date', 'Fajuru', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'],
            where: {
                [Op.and]: [{ CategoryId: island.CategoryId }, { Date: dayNo }],
            },
        });

        // if not found
        if (prayerTimes === null) {
            res.status(404).json({
                message: "Prayer times not found!",
            });
            return;
        }

        const prayerTimeJson = {
            "Fajuru": getPrayerDateTime(date, prayerTimes.Fajuru, island.Minutes),
            "Sunrise": getPrayerDateTime(date, prayerTimes.Sunrise, island.Minutes),
            "Dhuhr": getPrayerDateTime(date, prayerTimes.Dhuhr, island.Minutes),
            "Asr": getPrayerDateTime(date, prayerTimes.Asr, island.Minutes),
            "Maghrib": getPrayerDateTime(date, prayerTimes.Maghrib, island.Minutes),
            "Isha": getPrayerDateTime(date, prayerTimes.Isha, island.Minutes),
        }

        res.json(prayerTimeJson);
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong while trying to fetch the data.",
        });

        console.log(error);
    }
}

// function to find the day number of the year
function getDayOfYear(date = new Date()) {
    const endDate = Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
    );

    // first of january
    const startDate = Date.UTC(date.getFullYear(), 0, 0);

    const diffInMilliSec = endDate - startDate;

    const diffInDays = diffInMilliSec / 1000 / 60 / 60 / 24;

    return diffInDays;
}

// function to deserialize the date time got from the database
function getPrayerDateTime(date = new Date(), prayerTime, islandMinutes) {
    const islandPrayerTime = prayerTime + islandMinutes;

    const minutes = islandPrayerTime % 60;
    const hour = (islandPrayerTime - minutes) / 60

    const prayerDateTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour + 5, minutes);

    return prayerDateTime;
}