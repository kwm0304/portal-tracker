//WRITES PLAYER STATS TO FILE
import { launch } from "puppeteer";
import { promises as fs } from "fs";

async function readAndProcessFile() {
  const sport = "ncaaf";
  const year = 2020;
  try {
    const jsonString = await fs.readFile(
      `./transfers/${sport}/${sport}_${year}.json`,
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
    console.log("Player names:", playerNames.length);

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
  const year = 2020;
  const lowerFirst = firstName.toLowerCase();
  const lowerlast = lastName.toLowerCase();
  const url = `https://www.sports-reference.com/cfb/players/${lowerFirst}-${lowerlast}-1.html`;
  console.log(url);
  await page.goto(url);
  await page.setDefaultTimeout(60000);
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
    },
    stats: pageData,
  };
  return playerData;
}

async function scrapePlayers(browser) {
  const allData = [];
  const playerNames = await readAndProcessFile();
  const batchSize = 1;
  let playerCounter = 0;

  let missingPlayers = [];

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
      const data = await scrapePlayer(
        browser,
        player.firstName,
        player.lastName,
        player.school,
        player.position
      );
      allData.push(data);
    }
    try {
      await fs.writeFile(
        `./data/ncaaf/stats/player_stats_2020_batch_${i / batchSize}.json`,
        JSON.stringify(allData, null, 2),
        (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log(`Batch ${i / batchSize} Success!`);
          }
        }
      );
    } catch (error) {
      console.error(error);
    }
  }
}

async function main() {
  const browser = await launch();
  await scrapePlayers(browser);
  await browser.close();
}
main();
