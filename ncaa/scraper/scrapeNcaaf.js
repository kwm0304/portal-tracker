//WRITES PLAYER STATS TO FILE
import { launch } from "puppeteer";
import { writeFileSync, promises as fs } from "fs";

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
  const year = 2024;
  const url = `https://www.sports-reference.com/cfb/players/${firstName}-${lastName}-1.html`;

  await page.goto(url);
  await page.setDefaultTimeout(60000);
  await page.waitForSelector(".table_container.is_setup");

  let pageData = await page.evaluate((year) => {
    const rows = Array.from(document.querySelectorAll("table tr"));
    const filteredRows = rows.filter((row) => {
      const yearEl = row.querySelector("th#year_id a");
      return yearEl && yearEl.innerText === year.toString();
    });
    return filteredRows.map((row) => {
      const data = {};
      Array.from(row.querySelectorAll("td")).forEach((td) => {
        const value = td.innerText.trim();
        if (value) {
          const stat = td.getAttribute("data-stat");
          data[stat] = value;
        }
      });
      return data;
    });
  }, year);

  await page.close();
  console.log(pageData);
  return pageData.map((data) => {
    data.firstName = firstName;
    data.lastName = lastName;
    data.school = school;
    data.position = position;
    return data;
  });
}

async function scrapePlayers(browser) {
  const allData = [];
  const playerNames = await readAndProcessFile();
  const batchSize = 50;
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
    writeFileSync(
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
  }
}

async function main() {
  const browser = await launch();
  await scrapePlayers(browser);
  await browser.close();
}
main();
