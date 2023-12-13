import { launch } from 'puppeteer';
import { writeFileSync } from 'fs';

async function run() {
  const browser = await launch();
  const page = await browser.newPage();
  const year = 2020

  await page.goto(`https://www.sports-reference.com/cbb/seasons/men/${year}-ratings.html`)

  async function scrapePage() {
    console.log('scraping')
    let pageData = await page.evaluate(() => {
      let teams = [];
      let items = document.querySelectorAll('tr[data-row]');

      items.forEach((item) => {
        let team = {};
        try {
          team.name = item.querySelector('td[data-stat="school_name"] a').innerText;
          team.conference = item.querySelector('td[data-stat="conf_abbr"] a').innerText;
          team.rating = item.querySelector('th[data-stat="ranker"]').innerText;
          team.wins = item.querySelector('td[data-stat="wins"]').innerText;
          team.losses = item.querySelector('td[data-stat="losses"]').innerText;
          team.ppg = item.querySelector('td[data-stat="pts_per_g"]').innerText;
          team.oppPpg = item.querySelector('td[data-stat="opp_pts_per_g"]').innerText;
          team.mov = item.querySelector('td[data-stat="mov"]').innerText;
          team.sos = item.querySelector('td[data-stat="sos"]').innerText;
          team.osrs = item.querySelector('td[data-stat="srs_off"]').innerText;
          team.dsrs = item.querySelector('td[data-stat="srs_def"]').innerText;
          team.srs = item.querySelector('td[data-stat="srs"]').innerText;
          team.offRating = item.querySelector('td[data-stat="off_rtg"]').innerText;
          team.defRating = item.querySelector('td[data-stat="def_rtg"]').innerText;
          team.netRating = item.querySelector('td[data-stat="net_rtg"]').innerText;
        } catch (err) {
          console.error(err);
        }
        teams.push(team);
      })
      return teams;
    })
    return pageData;
  }
  let allData = await scrapePage();
  await browser.close();

  writeFileSync(`data/ncaab/ncaab_stats_${year}.json`, JSON.stringify(allData, null, 2), (err) => {
    if (err) {
      console.error(`An error occurred while writing to file for year ${year}.`, err)
    } else {
      console.log(`Finished writing to file for year ${year}.`)
    }
  });

}
run()
