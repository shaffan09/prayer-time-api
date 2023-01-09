const { Op } = require('sequelize');
const Island = require('../models/island.js');
const PrayerTimes = require('../models/prayer_time.js');

module.exports.getPrayerTime = async (req, res) => {
    let date = req.query.date;
    let from = req.query.from;
    let to = req.query.to;
    const islandId = req.query.islandId;

    if (islandId === '' || islandId === undefined) {
        res.status(400).json({ message: 'IslandID not passed!' });
        return
    }

    try {
        // finding the island
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

        // if requested for prayer times of a specific date
        if (date !== '' && date !== undefined) {
            date = new Date(date);
            getPrayerTimes(req, res, date, island);
            return;
        }

        // if requested for a specific time range
        if (from !== '' && from !== undefined && to !== '' && to !== undefined) {
            const year = new Date().getFullYear();
            // split the value to get month and day
            const fromArr = from.split('-');
            const toArr = to.split('-');

            // check if date is valid
            if (fromArr[0] < 1 || fromArr[1] < 1 || toArr[0] < 1 || toArr[1] < 1 ||
                fromArr[0] > 12 || fromArr[1] > 31 || toArr[0] > 12 || toArr[1] > 31) {
                res.status(400).json({ message: 'Invalid date passed!' });
                return;
            }

            // month substracted by one because js months starts from 0
            from = new Date(year, fromArr[0] - 1, fromArr[1]);
            to = new Date(year, toArr[0] - 1, toArr[1]);

            getPrayerTimesForRange(req, res, from, to, island);
            return;
        }

        res.status(400).json({ message: 'Bad request.' });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong while trying to fetch the data.",
        });

        console.log(error);
    }
}

// function to get prayer time for specific date
async function getPrayerTimes(req, res, date = new Date(), island) {
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
}

// function to return prayer times for a range of days
async function getPrayerTimesForRange(req, res, from = new Date(), to = new Date(), island) {
    // substract by one, because in DB Jan 1 is 0
    const start = getDayOfYear(from) - 1;
    const end = getDayOfYear(to) - 1;

    const prayerTimes = await PrayerTimes.findAll({
        attributes: ['CategoryId', 'Date', 'Fajuru', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'],
        where: {
            CategoryId: island.CategoryId,
            Date: { [Op.between]: [start, end] }
        },
    });

    let prayerTimesJson = [];

    prayerTimes.forEach(prayerTime => {
        // add one, because in DB Jan 1 is 0
        const date = new Date(new Date().getFullYear(), 0, prayerTime.Date + 1);
        prayerTimesJson.push({
            "Fajuru": getPrayerDateTime(date, prayerTime.Fajuru, island.Minutes),
            "Sunrise": getPrayerDateTime(date, prayerTime.Sunrise, island.Minutes),
            "Dhuhr": getPrayerDateTime(date, prayerTime.Dhuhr, island.Minutes),
            "Asr": getPrayerDateTime(date, prayerTime.Asr, island.Minutes),
            "Maghrib": getPrayerDateTime(date, prayerTime.Maghrib, island.Minutes),
            "Isha": getPrayerDateTime(date, prayerTime.Isha, island.Minutes),
        });
    });

    res.json(prayerTimesJson);
}

// helper function to find the day number of the year
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

// helper function to deserialize the time got from the database
function getPrayerDateTime(date = new Date(), prayerTime, islandMinutes) {
    const islandPrayerTime = prayerTime + islandMinutes;

    const minutes = islandPrayerTime % 60;
    const hour = (islandPrayerTime - minutes) / 60

    const prayerDateTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour + 5, minutes, 0).toISOString();

    return prayerDateTime;
}