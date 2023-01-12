const express = require("express");
const router = express.Router();
const island = require("../controllers/island.js");

router.get("/", island.getAllIslands);
router.get('/:id', island.getIsland);
// router.get('/atoll/:atoll', island.getIslandsByAtoll);

module.exports = router;
