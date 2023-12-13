import { launch } from 'puppeteer';
import { writeFileSync } from 'fs';
//WORKS FOR 2020-23. 24 not yet available
async function run() {
  const browser = await launch();
  const page = await browser.newPage();
  const year = 2020
  let dbRef = "ncaaf"

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
        team.name = item.querySelector('td[data-stat="school_name"] a').innerText;
        // CONFERENCE
        team.conference = item.querySelector('td[data-stat="conf_abbr"]').innerText;
        //RATING
        let rating = item.querySelector('th[data-stat="ranker"]').innerText;
        team.rating = rating === '' ? 'NR' : +rating;
        //WINS, LOSSES
        let wins = item.querySelector('td[data-stat="wins"]').innerText;
        team.wins = wins === '' ? 0 : +wins;

        let losses = item.querySelector('td[data-stat="losses"]').innerText;
        team.losses = losses === '' ? 0 : +losses;
        //SRS
        let srs = item.querySelector('td[data-stat="srs"]').innerText;
        team.srs = srs === '' ? 0 : +srs;
        //OSRS
        let osrs = item.querySelector('td[data-stat="srs_off"]').innerText;
        team.osrs = osrs === '' ? 0 : +osrs;
        //DSRS
        let dsrs = item.querySelector('td[data-stat="srs_def"]').innerText;
        team.dsrs = dsrs === '' ? 0 : +dsrs;
        //POINTS FOR
        let ppg = item.querySelector('td[data-stat="points_per_g"]').innerText;
        team.ppg = ppg === '' ? 0 : +ppg;
        //POINTS DIFFERENTIAL
        let pointsDifferential = item.querySelector('td[data-stat="opp_points_per_g"]').innerText;
        team.pointsDifferential = pointsDifferential === '' ? 0 : +pointsDifferential;
        //MOV
        let passingO = item.querySelector('td[data-stat="pass_yds_per_att"]').innerText;
        team.passingO = passingO === '' ? 0 : +passingO;
        //SOS MOV
        let passingD = item.querySelector('td[data-stat="opp_pass_yds_per_att"]').innerText;
        team.passingD = passingD === '' ? 0 : +passingD;
        //SRS MOV
        let rushO = item.querySelector('td[data-stat="rush_yds_per_att"]').innerText;
        team.rushO = rushO === '' ? 0 : +rushO;
        //OSRS MOV
        let rushD = item.querySelector('td[data-stat="opp_rush_yds_per_att"]').innerText;
        team.rushD = rushD === '' ? 0 : +rushD;
        //DSRS MOV
        let ydsPerPlay = item.querySelector('td[data-stat="tot_yds_per_play"]').innerText;
        team.ydsPerPlay = ydsPerPlay === '' ? 0 : +ydsPerPlay;
        //OFFENSIVE PLAYS
        let oppYPP = item.querySelector('td[data-stat="opp_tot_yds_per_play]"]').innerText;
        team.oppYPP = oppYPP === '' ? 0 : +oppYPP;
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
  
    writeFileSync(`./data/${dbRef}/${dbRef}_stats_${year}.json`, JSON.stringify(allData, null, 2), (err) => {
      if (err) {
        console.error(`An error occurred while writing to file for year ${year}.`, err)
      } else {
        console.log(`Finished writing to file for year ${year}.`)
      }
    })
  }
  run();
