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
      "playerInfo.firstName": "Tre",
      "playerInfo.lastName": "Williams",
      "playerInfo.school": "Arkansas",
    };

    const updateDoc = {
      $push: {
        stats: {
          g: "10",
          tackles_solo: "11",
          tackles_assists: "17",
          tackles_total: "28",
          tackles_loss: "6.5",
          sacks: "6",
          school_name: "Arkansas",
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
