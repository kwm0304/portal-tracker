import { launch } from 'puppeteer';
import { writeFileSync } from 'fs';

async function run() {
  const browser = await launch();
  const page = await browser.newPage();
  const year = 2024

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
          let teamRating = item.querySelector('th[data-stat="ranker"]').innerText;
          team.rating = teamRating === '' ? 'NR' : +teamRating;

          let wins = item.querySelector('td[data-stat="wins"]').innerText;
          team.wins = wins === '' ? 0 : +wins;

          let losses = item.querySelector('td[data-stat="losses"]').innerText;
          team.losses = losses === '' ? 0 : +losses;

          let ppg = item.querySelector('td[data-stat="pts_per_g"]').innerText;
          team.ppg = ppg === '' ? 0 : +ppg;

          let oppPpg = item.querySelector('td[data-stat="opp_pts_per_g"]').innerText;
          team.oppPpg = oppPpg === '' ? 0 : +oppPpg;

          let mov = item.querySelector('td[data-stat="mov"]').innerText;
          team.mov = mov === '' ? 0 : +mov;

          let sos = item.querySelector('td[data-stat="sos"]').innerText;
          team.sos = sos === '' ? 0 : +sos;

          let osrs = item.querySelector('td[data-stat="srs_off"]').innerText;
          team.osrs = osrs === '' ? 0 : +osrs;

          let dsrs = item.querySelector('td[data-stat="srs_def"]').innerText;
          team.dsrs = dsrs === '' ? 0 : +dsrs;

          let srs = item.querySelector('td[data-stat="srs"]').innerText;
          team.srs = srs === '' ? 0 : +srs;

          let offRating = item.querySelector('td[data-stat="off_rtg"]').innerText;
          team.offRating = offRating === '' ? 0 : +offRating;

          let defRating = item.querySelector('td[data-stat="def_rtg"]').innerText;
          team.defRating = defRating === '' ? 0 : +defRating;

          let netRating = item.querySelector('td[data-stat="net_rtg"]').innerText;
          team.netRating = netRating === '' ? 0 : +netRating;

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

  writeFileSync(`./data/ncaab/ncaab_stats_${year}.json`, JSON.stringify(allData, null, 2), (err) => {
    if (err) {
      console.error(`An error occurred while writing to file for year ${year}.`, err)
    } else {
      console.log(`Finished writing to file for year ${year}.`)
    }
  });

}
run()
