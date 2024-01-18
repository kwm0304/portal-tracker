const { MongoClient } = require("mongodb");
require("dotenv").config();

const update = async () => {
  const client = new MongoClient(process.env.MONGO_URI);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("transfer_players");
    const collection = db.collection("players");

    const result = await collection.updateMany(
      {},
      { $set: { "playerInfo.year": "2020" } }
    );
    console.log("Update operation result:", result);
  } catch (error) {
    console.error("Error updating:", error);
  } finally {
    await client.close();
    console.log("MongoDB connection closed");
  }
};

update();
