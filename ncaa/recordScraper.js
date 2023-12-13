import { launch } from 'puppeteer';
import { writeFileSync } from 'fs';

async function run() {
  const browser = await launch();
  const page = await browser.newPage();
  const year = 2021
  const sport = "football"
  let dbRef = ""
  if (sport === "football") {
    dbRef = "ncaaf"
  } else if (sport === "basketball") {
    dbRef = "ncaab"
  }

  await page.goto(`https://www.sports-reference.com/cfb/years/${year}-ratings.html`)
async function scrapePage() {
  console.log('scraping')
  let pageData = await page.evaluate(() => {
    let teams = [];
    let items = document.querySelectorAll('tr[data-row]');

    items.forEach((item) => {
      let team = {};
      try {
        // NAME
        team.name = item.querySelector('th[data-stat="school_name"] a').innerText;
        // CONFERENCE
        team.conference = item.querySelector('td[data-stat="conf_abbr"]').innerText;
        // RATING, RANK, WINS, LOSSES, etc.
        team.wins = item.querySelector('td[data-stat="wins"]').innerText;
        team.losses = item.querySelector('td[data-stat="losses"]').innerText;
        //SRS
        team.srs = item.querySelector('td[data-stat="srs"]').innerText;
        //OSRS
        team.osrs = item.querySelector('td[data-stat="srs_off"]').innerText;
        //DSRS
        team.dsrs = item.querySelector('td[data-stat="srs_def"]').innerText;
        //POINTS FOR
        team.ppg = item.querySelector('td[data-stat="points_per_g"]').innerText;
                //POINTS DIFFERENTIAL
        team.pointsDifferential = item.querySelector('td[data-stat="opp_points_per_g"]').innerText;
        //MOV
        team.mov = item.querySelector('td.right:nth-child(14)').innerText;
        //SOS MOV
        team.sosMov = item.querySelector('td.right:nth-child(15)').innerText;
        //SRS MOV
        team.srsMov = item.querySelector('td.right:nth-child(16)').innerText;
        //OSRS MOV
        team.osrsMov = item.querySelector('td.right:nth-child(17)').innerText;
        //DSRS MOV
        team.dsrsMov = item.querySelector('td.right:nth-child(18)').innerText;
        //OFFENSIVE PLAYS
        team.offensivePlays = item.querySelector('td.right:nth-child(19)').innerText;
        //OFFENSIVE YARDS
        team.offensiveYards = item.querySelector('td.right:nth-child(20)').innerText;
        //OFFENSIVE YARDS PER PLAY
        team.offensiveYardsPerPlay = item.querySelector('td.right:nth-child(21)').innerText;
      } catch (err) {
        console.log(err);
      }
      teams.push(team);
  })
  return teams;
})
return pageData;
}
let allData = await scrapePage();
  
    await browser.close();
  
    writeFileSync(`data/${dbRef}Record_${year}.json`, JSON.stringify(allData, null, 2), (err) => {
      if (err) {
        console.error(`An error occurred while writing to file for year ${year}.`, err)
      } else {
        console.log(`Finished writing to file for year ${year}.`)
      }
    })
  }
  run();
