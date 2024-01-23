const { MongoClient } = require("mongodb");
require("dotenv").config();
const fs = require("fs").promises;

const update = async () => {
  const client = new MongoClient(process.env.MONGO_URI);

  try {
    const year = "2022";
    const path = `../ncaa/data/ncaaf/stats/${year}/ncaaf_transfers_${year}.json`;
    const transfers = JSON.parse(await fs.readFile(path, "utf8"));

    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("transfer_players");
    const collection = db.collection("players");

    for (const transfer of transfers) {
      const filter = {
        "playerInfo.firstName": transfer.firstName,
        "playerInfo.lastName": transfer.lastName,
        "playerInfo.year": year,
        "playerInfo.school": transfer.newSchool,
      };

      const updateDoc = {
        $set: {
          "playerInfo.oldSchool": transfer.oldSchool,
        },
      };

      const result = await collection.updateOne(filter, updateDoc);
      console.log(
        `For player ${transfer.firstName} ${transfer.lastName}, matched ${result.matchedCount}, updated: ${result.modifiedCount}`
      );
    }
  } catch (error) {
    console.error("Error updating:", error);
  } finally {
    await client.close();
    console.log("Disconnected from MongoDB");
  }
};

update();
