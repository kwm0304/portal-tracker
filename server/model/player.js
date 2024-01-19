const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
  playerInfo: {
    firstName: String,
    lastName: String,
    school: String,
    position: String,
    year: String,
  },
  stats: [Schema.Types.Mixed],
});

const Player = mongoose.model("player", PlayerSchema);

module.exports = Player;
