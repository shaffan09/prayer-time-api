const { Op } = require("sequelize");
const Island = require("../models/island.js");

// get all the islands or islands that meet the search term
module.exports.getAllIslands = async (req, res) => {
  const searchTerm = req.query.search;

  try {
    // if query parameter passed
    if (searchTerm !== '' && searchTerm !== undefined) {
      var islands = await Island.findAll({
        attributes: ["IslandId", "Island", "Atoll", "CategoryId", "Minutes"],
        where: {
          Island: { [Op.startsWith]: searchTerm, }
        }
      });

      // is no islands found
      if (islands.length === 0) {
        res.status(404).json({
          message: "No islands found!",
        });
        return;
      }

      res.json(islands);
      return;
    }

    // if no query parameter
    var islands = await Island.findAll({
      attributes: ["IslandId", "Island", "Atoll", "CategoryId", "Minutes"],
    });

    res.json(islands);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong while trying to fetch the data.",
    });

    console.log(error);
  }
};

// get island by id
module.exports.getIsland = async (req, res) => {
  try {
    const islandId = req.params.id;

    const island = await Island.findOne({
      attributes: ["IslandId", "Island", "Atoll", "CategoryId", "Minutes"],
      where: { IslandId: islandId }
    });

    // if no island found
    if (island === null) {
      res.status(404).json({
        message: "Island not found!",
      });
      return;
    }

    res.json(island);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong while trying to fetch the data.",
    });

    console.log(error);
  }
}

// get island by atoll name or by category id
module.exports.getIslandsByAtoll = async (req, res) => {
  const atoll = req.params.atoll;

  try {
    const islands = await Island.findAll({
      attributes: ["IslandId", "Island", "Atoll", "CategoryId", "Minutes"],
      where: {
        [Op.or]: [{ Atoll: atoll }, { CategoryId: atoll }],
      },
    });

    // if not island found
    if (islands.length === 0) {
      res.status(404).json({
        message: "No islands found!",
      });
      return;
    }

    res.json(islands);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong while trying to fetch the data.",
    });

    console.log(error);
  }
}
