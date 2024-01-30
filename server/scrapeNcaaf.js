//WRITES PLAYER STATS TO FILE
const puppeteer = require("puppeteer");
const fs = require("fs").promises;
const mongoose = require("mongoose");
const Player = require("./model/player.js");
require("dotenv").config();

async function readAndProcessFile() {
  const sport = "ncaaf";
  const year = 2023;
  try {
    const jsonString = await fs.readFile(
      `../ncaa/data/${sport}/stats/${year}/${sport}_transfers_${year}.json`,
      "utf8"
    );
    const data = JSON.parse(jsonString);
    const playerNames = [];
    for (const entry of data) {
      playerNames.push({
        firstName: entry.firstName,
        lastName: entry.lastName,
        school: entry.newSchool,
        position: entry.position,
      });
    }
    console.log(playerNames.length);
    return playerNames;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

readAndProcessFile();

// Will search ^ year + 1. Football stats only go up to 23'
async function scrapePlayer(browser, firstName, lastName, school, position) {
  const page = await browser.newPage();
  const year = 2023;
  const lowerFirst = firstName.toLowerCase();
  const lowerlast = lastName.toLowerCase();
  const url = `https://www.sports-reference.com/cfb/players/${lowerFirst}-${lowerlast}-1.html`;
  console.log(url);
  await page.goto(url);
  await page.setDefaultTimeout(30000);
  let pageData;

  try {
    await page.waitForSelector("div.table_container.is_setup");
    pageData = await page.evaluate((year) => {
      const stats = [];
      const rows = Array.from(
        document.querySelectorAll("div.table_container.is_setup table tbody tr")
      );

      const filteredRows = rows.filter((row) => {
        const yearEl = row.querySelector("th a");
        return yearEl && yearEl.innerText === year.toString();
      });

      const excludeProps = ["conf_abbr", "class", "pos"];

      filteredRows.map((row) => {
        const data = {};
        Array.from(row.querySelectorAll("td")).forEach((td) => {
          const stat = td.getAttribute("data-stat");
          const value = td.innerText.trim();
          if (
            !excludeProps.includes(stat) &&
            value &&
            value !== "0" &&
            value !== "0.0"
          ) {
            data[stat] = value;
          }
        });
        stats.push(data);
      });
      return stats;
    }, year);
  } catch (error) {
    console.error(error);
    pageData = "No stats found";
  }

  await page.close();
  console.log(pageData);
  const playerData = {
    playerInfo: {
      firstName: firstName,
      lastName: lastName,
      school: school,
      position: position,
      year: "2023",
    },
    stats: pageData,
  };
  return playerData;
}

async function scrapePlayers(browser) {
  const playerNames = await readAndProcessFile();
  const batchSize = 10;
  let playerCounter = 0;

  let missingPlayers = [];
  console.log("missingplayers", missingPlayers.length);

  for (let i = 0; i < playerNames.length; i += batchSize) {
    const batch = playerNames.slice(i, i + batchSize);
    for (const player of batch) {
      if (!player.school || !player.school.trim() === "" || !player.lastName) {
        console.log(`Skipping ${player.firstName} ${player.lastName}`);
        missingPlayers.push(player);
        continue;
      }
      playerCounter++;
      console.log(
        `Processing player #${playerCounter}: ${player.firstName} ${player.lastName}, ${player.school}`
      );
      try {
        const data = await scrapePlayer(
          browser,
          player.firstName,
          player.lastName,
          player.school,
          player.position
        );

        const newPlayer = new Player(data);
        await newPlayer.save();
        console.log(`Saved data for ${player.firstName} ${player.lastName}`);
      } catch (error) {
        console.error("Error saving to mongodb", error);
      }
    }
  }
}

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const browser = await puppeteer.launch();
    await scrapePlayers(browser);
    await browser.close();
  } catch (error) {
    console.error("Error connecting to mongodb", error);
  } finally {
    mongoose.disconnect();
  }
}
main();
