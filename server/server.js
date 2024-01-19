require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const router = require("./routes/playerRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});
app.use(express.static(path.join(__dirname, "../client/dist")));

app.use("/player", router);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
