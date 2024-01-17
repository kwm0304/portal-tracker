const express = require("express");
const { createPlayer, getPlayers } = require("../controller/playerController");
const router = express.Router();

router.post("/create", createPlayer);
router.get("/get", getPlayers);

module.exports = router;
