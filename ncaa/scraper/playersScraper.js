import { launch } from 'puppeteer';
import { writeFileSync } from 'fs';
import {setTimeout} from "node:timers/promises";

async function run() {
  const browser = await launch();
  const page = await browser.newPage();
  const year = 2024
  const sport = "basketball"
  let dbRef = ""
  if (sport === "football") {
    dbRef = "ncaaf"
  } else if (sport === "basketball") {
    dbRef = "ncaab"
  }

  await page.goto(`https://www.on3.com/transfer-portal/industry/${sport}/${year}/`)
  
  async function clickLoadMoreBtn() {
    const loadMoreBtnSelector = 'button.MuiButtonBase-root.MuiButton-root.MuiButton-text.TransferPortalPage_btnLoadMore__bPZFg.MuiButton-textPrimary.MuiButton-disableElevation';
  
    try {
      const isButtonVisible = await page.$eval(loadMoreBtnSelector, (el) => el.isConnected && getComputedStyle(el).display !== 'none');
    
      if (isButtonVisible) {
        await page.click(loadMoreBtnSelector);
        console.log('Clicked the "Load More" button');
        await setTimeout(1000);
        await clickLoadMoreBtn();
      }
    } catch (err) {
      console.log(err);
    }
  }
  await clickLoadMoreBtn();

  async function scrapePage() {
    console.log('scraping')
      let pageData = await page.evaluate(() => {
        function toTitleCase(str) {
          return str.toLowerCase().split(' ').map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1);
          }).join(' ');
        }
      let players = [];
      let items = document.querySelectorAll('div.TransferPortalItem_transferPortalItem__TWWEJ');
  
      items.forEach((item) => {
        let player = {};
        try {
          //NAME
          const playerName = item.querySelector('div.TransferPortalItem_playerDetailsContainer__AD00N > div.TransferPortalItem_playerNameContainer__TmLnJ > a').innerText;
          player.firstName = playerName.split(' ')[0];
          player.lastName = playerName.split(' ')[1];
          //POSITION
          player.position = item.querySelector('span.MuiTypography-root.TransferPortalItem_position__6sxbf.MuiTypography-body1.MuiTypography-colorTextPrimary').innerText;
          //RATING
          const playerRatingEl = item.querySelector('div.TransferPortalItem_ratingsContainer__U0G5a a.StarRating_linkWrapper__RHR4l span.StarRating_overallRating__MTh52');
          playerRatingEl ? player.rating = playerRatingEl.innerText : player.rating = '';
          //OLD SCHOOL
          const oldSchoolImageEl = item.querySelector('div.TransferPortalItem_statusContainer__Gw8ER > a.MuiTypography-root.MuiLink-root.MuiLink-underlineNone.TransferPortalItem_lastTeam__1zqJn.MuiTypography-colorPrimary > img');
          if (oldSchoolImageEl) {
            player.oldSchool = toTitleCase(oldSchoolImageEl.getAttribute('title'));
          } else {
            player.oldSchool = '';
          }
          //NEW SCHOOL
          const newSchoolEl = item.querySelector('div.TransferPortalItem_committedContainer__16ldp > h6');
          if (newSchoolEl) {
            let newSchoolWords = newSchoolEl.innerText.split(' ');
            newSchoolWords.pop();
            player.newSchool = newSchoolWords.join(' ');
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

  writeFileSync(`./transfers/${dbRef}/${dbRef}_${year}.json`, JSON.stringify(allPlayers, null, 2), (err) => {
    if (err) {
      console.error(`An error occurred while writing to file for year ${year}.`, err)
    } else {
      console.log(`Finished writing to file for year ${year}.`)
    }
  })
  await browser.close();
}
run();