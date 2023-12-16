import { launch } from 'puppeteer';
import { readFile, writeFileSync } from 'fs';
import { promisify } from 'util';

const readFileAsync = promisify(readFile);

async function run() {
  const browser = await launch();
  const year = 2023;
  const sport = 'ncaab';
  const allData = [];

  try {
    const jsonString = await readFileAsync(`./transfers/${sport}/${sport}_${year}.json`, 'utf8');
    const data = JSON.parse(jsonString);

    for (const entry of data) {
      const firstName = entry.firstName;
      const lastName = entry.lastName;

      const playerStats = await scrapePlayer(browser, sport, firstName, lastName);
      allData.push({ firstName, lastName, stats: playerStats }) 
    }
    writeFileSync(`./data/${sport}/stats/${sport}_stats_${year}.json`, JSON.stringify(allData, null, 2));

    console.log(`Finished writing to file for year ${year}.`);
  } catch (err) {
    console.log("Error occurred:", err);
  } finally {
    await browser.close();
  }
}

async function scrapePlayer(browser, sport, firstName, lastName) {
  const page = await browser.newPage();
  await page.goto(`https://www.sports-reference.com/${sport}/players/${firstName}-${lastName}-1.html`);

  let playerStats = await scrapePage(page);

  console.log(`${firstName} ${lastName}`, playerStats);

  await page.close();
}

async function scrapePage(page) {
  let pageData = await page.evaluate(() => {
    let stats = [];
    let items = document.querySelectorAll('tr.players_totals');

    items.forEach((item) => {
      let statYear = {};
      try {
        statYear.season = item.querySelector('th a').innerText;

        statYear.class = item.querySelector('td[data-stat="class"]').innerText;

        let gamesPlayed = item.querySelector('td[data-stat="games"]').innerText;
        statYear.gamesPlayed = gamesPlayed === '' ? 0 : +gamesPlayed;

        let gamesStarted = item.querySelector('td[data-stat="games_started"]').innerText;
        statYear.gamesStarted = gamesStarted === '' ? 0 : +gamesStarted;

        let minutesPlayed = item.querySelector('td[data-stat="mp"]').innerText;
        statYear.minutesPlayed = minutesPlayed === '' ? 0 : +minutesPlayed;

        let fieldGoalsMade = item.querySelector('td[data-stat="fg"]').innerText;
        statYear.fieldGoalsMade = fieldGoalsMade === '' ? 0 : +fieldGoalsMade;

        let fieldGoalsAttempted = item.querySelector('td[data-stat="fga"]').innerText;
        statYear.fieldGoalsAttempted = fieldGoalsAttempted === '' ? 0 : +fieldGoalsAttempted;

        let fgPercent = item.querySelector('td[data-stat="fg_pct"]').innerText;
        statYear.fieldGoalPercent = fgPercent === '' ? 0 : +fgPercent;

        let rebounds = item.querySelector('td[data-stat="trb"]').innerText;
        statYear.rebounds = rebounds === '' ? 0 : +rebounds;

        let assists = item.querySelector('td[data-stat="ast"]').innerText;
        statYear.assists = assists === '' ? 0 : +assists;

        let steals = item.querySelector('td[data-stat="stl"]').innerText;
        statYear.steals = steals === '' ? 0 : +steals;

        let blocks = item.querySelector('td[data-stat="blk"]').innerText;
        statYear.blocks = blocks === '' ? 0 : +blocks;

        let points = item.querySelector('td[data-stat="pts"]').innerText;
        statYear.points = points === '' ? 0 : +points;

      } catch (err) {
        console.log(err);
      }
      stats.push(statYear);
    })
    return stats;
  });
  return pageData;
}

run();
