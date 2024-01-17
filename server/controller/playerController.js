const mongoose = require("mongoose");
const Player = require("../model/player");

const createPlayer = async (req, res) => {
  const { firstName, lastName, school, position } = req.body;
  try {
    const player = await Player.create({
      firstName,
      lastName,
      school,
      position,
    });
    res.status(201).json(player);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
