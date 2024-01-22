const { MongoClient } = require("mongodb");
require("dotenv").config();

const update = async () => {
  const client = new MongoClient(process.env.MONGO_URI);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("transfer_players");
    const collection = db.collection("players");

    const filter = {
      "playerInfo.firstName": "Warren",
      "playerInfo.lastName": "Thompson",
      "playerInfo.school": "Arkansas",
    };

    const updateDoc = {
      $push: {
        stats: {
          g: "13",
          rec: "19",
          rec_yds: "304",
          rec_yds_per_rec: "16",
          rec_td: "2",
          scrim_att: "19",
          scrim_yds: "304",
          scrim_yds_per_att: "16",
          scrim_td: "2",
          pass_cmp: "1",
          pass_att: "2",
          pass_yds: "27",
          pass_cmp_pct: "50",
          pass_yds_per_att: "13.5",
          adj_pass_yds_per_att: "-9",
          pass_int: "1",
          pass_rating: "63.4",
        },
      },
    };

    const result = await collection.updateOne(filter, updateDoc, { new: true });
    console.log(
      `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
    );
  } catch (error) {
    console.error("Error updating:", error);
  } finally {
    await client.close();
    console.log("MongoDB connection closed");
  }
};

update();
