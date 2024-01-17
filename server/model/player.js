const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DefensiveSchema = new Schema({
  school_name: String,
  g: String,
  tackles_solo: String,
  tackles_assists: String,
  tackles_total: String,
  tackles_loss: String,
  sacks: String,
  def_int: String,
  def_int_yds: String,
  def_int_yds_per_int: String,
  def_int_td: String,
  pass_defended: String,
  fumbles_rec: String,
  fumbles_rec_yds: String,
  fumbles_rec_td: String,
  fumbles_forced: String,
});

const ReceivingRushingSchema = new Schema({
  school_name: String,
  g: String,
  rec: String,
  rec_yds: String,
  rec_yds_per_rec: String,
  rec_td: String,
  rush_att: String,
  rush_yds: String,
  rush_yds_per_att: String,
  rush_td: String,
  scrim_att: String,
  scrim_yds: String,
  scrim_yds_per_att: String,
  scrim_td: String,
});

const ScoringSchema = new Schema({
  school_name: String,
  td_rush: String,
  td_rec: String,
  td_def_int: String,
  td_fumbles_rec: String,
  td_punt_ret: String,
  td_kick_ret: String,
  td_other: String,
  td_total: String,
  two_pt_md: String,
  safety_md: String,
  points: String,
});

const PassingSchema = new Schema({
  school_name: String,
  g: String,
  pass_cmp: String,
  pass_att: String,
  pass_cmp_pct: String,
  pass_yds: String,
  pass_yds_per_att: String,
  adj_pass_yds_per_att: String,
  pass_td: String,
  pass_int: String,
  pass_rating: String,
});

const SpecialTeamsSchema = new Schema({
  school_name: String,
  g: String,
  punt: String,
  punt_yds: String,
  punt_yds_per_punt: String,
  xpm: String,
  xpa: String,
  xp_pct: String,
  fgm: String,
  fga: String,
  fg_pct: String,
  kick_points: String,
});

const PlayerSchema = new Schema({
  playerInfo: {
    firstName: String,
    lastName: String,
    school: String,
    position: String,
  },
  stats: {
    defensive: [DefensiveSchema],
    receivingRushing: [ReceivingRushingSchema],
    scoring: [ScoringSchema],
    passing: [PassingSchema],
    specialTeams: [SpecialTeamsSchema],
  },
});

const Player = mongoose.model("player", PlayerSchema);

module.exports = Player;
