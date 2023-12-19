import { launch } from 'puppeteer';
import { readFile, writeFileSync } from 'fs';
import { promisify } from 'util';

const readFileAsync = promisify(readFile);

const sport = 'ncaab';
const year = 2023;

async function readAndProcessFile() {
  try {
    const jsonString = await readFileAsync(`./transfers/${sport}/${sport}_${year}.json`, 'utf8');
    const data = JSON.parse(jsonString);

    const schools = {};
    for (const entry of data) {
      const school = entry.newSchool;
      const player = { firstName: entry.firstName, lastName: entry.lastName };

      if (!schools[school]) {
        schools[school] = [];
      }
      schools[school].push(player);
    }

    const result = Object.keys(schools).map(school => ({ newSchool: school, players: schools[school] }));
    return result;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

readAndProcessFile();



async function scrapePlayer(browser, sport, firstName, lastName) {
  let ref = ''
  if (sport === 'ncaab') {
    ref = 'cbb'
  } else if (sport === 'ncaaf') {
    ref = 'cfb'
  }
  const thisYear = year.slice(2);
  console.log(thisYear)
  const page = await browser.newPage();
  const url = `https://www.sports-reference.com/${ref}/players/${firstName}-${lastName}-1.html`;
  console.log('Visiting URL:', url);
  
  await page.goto(url);

  await page.waitForSelector(`#players_per_game\\.${year}`);

  let playerStats = await page.evaluate((year) => {
    let stats = [];
    let item = document.querySelector(`#players_per_game\\.${year}`);
    if (item) {
      let statYear = {};
    try {
      statYear.class = item.querySelector('td[data-stat="class"]').innerText;

      let gamesPlayed = item.querySelector('td[data-stat="games"]').innerText;
      statYear.gamesPlayed = gamesPlayed === '' ? 0 : +gamesPlayed;

      let gamesStarted = item.querySelector('td[data-stat="games_started"]').innerText;
      statYear.gamesStarted = gamesStarted === '' ? 0 : +gamesStarted;

      let minutesPlayed = item.querySelector('td[data-stat="mp_per_g"]').innerText;
      statYear.minutesPlayed = minutesPlayed === '' ? 0 : +minutesPlayed;

      let rebounds = item.querySelector('td[data-stat="trb_per_g"]').innerText;
      statYear.rebounds = rebounds === '' ? 0 : +rebounds;

      let assists = item.querySelector('td[data-stat="ast_per_g"]').innerText;
      statYear.assists = assists === '' ? 0 : +assists;

      let steals = item.querySelector('td[data-stat="stl_per_g"]').innerText;
      statYear.steals = steals === '' ? 0 : +steals;

      let blocks = item.querySelector('td[data-stat="blk_per_g"]').innerText;
      statYear.blocks = blocks === '' ? 0 : +blocks;

      let points = item.querySelector('td[data-stat="pts_per_g"]').innerText;
      statYear.points = points === '' ? 0 : +points;
    } catch (err) {
      console.error(err)
    }
    stats.push(statYear);
  }
  if (!item) {
    console.log('Selector not found')
  }
  return stats;
  }, year);
  await page.close();
  return playerStats;
}

async function scrapeAllPlayers(browser, sport, playerNames, year) {
  const allData = []
  for (const playerName of playerNames) {
    const playerStats = await scrapePlayer(browser, sport, playerName.firstName, playerName.lastName, year);
    const playerData = {
      firstName: playerName.firstName,
      lastName: playerName.lastName,
      stats: playerStats
    }
    allData.push(playerData);
  }

  writeFileSync(`./transfers/${sport}/${sport}_${year}_stats.json`, JSON.stringify(allData, null, 2), (err) => { 
    if (err) {
      console.error(`An error occurred while writing to file for year ${year}.`, err)
    } else {
      console.log(`Finished writing to file for year ${year}.`)
    }
  });
  
  await browser.close();
}

async function main() {
  const playerNames = await readAndProcessFile();
  const browser = await launch();
  await scrapeAllPlayers(browser, sport, playerNames, year); 
  await browser.close();
}
main()

