const mongoose = require("mongoose");
const Player = require("../model/player");

const createPlayer = async (req, res) => {
  const { firstName, lastName, school, position, stats } = req.body;
  try {
    const player = await Player.create({
      playerInfo: {
        firstName,
        lastName,
        school,
        position,
      },
      stats,
    });
    res.status(201).json(player);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPlayers = async (req, res) => {
  try {
    const schoolFilter = req.query.school;
    let query = {};

    if (schoolFilter) {
      query["playerInfo.school"] = schoolFilter;
    }

    const players = await Player.find(query);
    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createPlayer, getPlayers };
