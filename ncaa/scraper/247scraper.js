import { launch } from 'puppeteer';
import { writeFileSync } from 'fs';
import {setTimeout} from "node:timers/promises";

async function run() {
  const browser = await launch();
  const page = await browser.newPage();
  const year = 2020

  await page.goto(`https://247sports.com/season/${year}-basketball/transferportal/`)

  async function clickLoadMoreButton() {
    const loadMoreBtnSelector = 'button.action-button.transfer-group-loadMore';

    try {
      if (loadMoreBtnSelector) {
        await page.click(loadMoreBtnSelector);
        console.log('Clicked the "Load More" button');
        await setTimeout(1000);
        await clickLoadMoreButton();
      }
    } catch (err) {
      console.log(err);
    }
  }
  await clickLoadMoreButton();

  async function scrapePage() {
    console.log('scraping 247')
    let pageData = await page.evaluate(() => {
    let players = [];
    let items = document.querySelectorAll('li.transfer-player')

    items.forEach((item) => {
      let player = {};
      try {
      player.firstName = item.querySelector('h3 a').innerText.split(' ')[0];
      player.lastName = item.querySelector('h3 a').innerText.split(' ')[1];
      let rating = item.querySelector('div.rating').innerText;
      player.rating = rating === '' ? 'NR' : +rating;
      player.position = item.querySelector('div.position').innerText;
      const oldSchoolImageEl = item.querySelector('div.transfer-prediction.prediction > a > img');
      if (oldSchoolImageEl) {
        player.oldSchool = oldSchoolImageEl.getAttribute('alt');
      } else {
        player.oldSchool = '';
      }
      const newSchoolImageEl = item.querySelector('div.transfer-prediction.prediction > ul > li > a > img');
      if (newSchoolImageEl) {
        player.newSchool = newSchoolImageEl.getAttribute('alt');
      } else {
        player.newSchool = '';
      }
    } catch (err) {
      console.log(err);
    }
    players.push(player);
    })
    return players;
    })
    return pageData;
  }
  let allPlayers = await scrapePage();

  writeFileSync(`./transfers/ncaab/ncaab_${year}.json`, JSON.stringify(allPlayers, null, 2), (err) => {
    if (err) {
      console.error(`An error occurred while writing to file for year ${year}.`, err)
    } else {
      console.log(`Finished writing to file for year ${year}.`)
    }
  })
  await browser.close();
}
run()