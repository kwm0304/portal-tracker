const puppeteer = require('puppeteer');
const fs = require('fs');

async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.on3.com/transfer-portal/industry/football/2021/')

  async function clickLoadMoreBtn() {
    const loadMoreBtnSelector = 'button.MuiButtonBase-root.MuiButton-root.MuiButton-text.TransferPortalPage_btnLoadMore__bPZFg.MuiButton-textPrimary.MuiButton-disableElevation';

      const loadMoreBtn = await page.$(loadMoreBtnSelector);

      if (loadMoreBtn) {
        await loadMoreBtn.click();
        await page.waitFor(500);
        await clickLoadMoreBtn();
      }
  }
  await clickLoadMoreBtn();

  async function scrapePage() {
    let pageData = await page.evaluate(() => {
      let players = [];
      let items = document.querySelectorAll('div.TransferPortalItem_transferPortalItem__TWWEJ');

      items.forEach((item) => {
        let player = {};
        try {
          //NAME
          player.name = item.querySelector('div.TransferPortalItem_playerDetailsContainer__AD00N > div.TransferPortalItem_playerNameContainer__TmLnJ > a').innerText;
          //POSITION
          player.position = item.querySelector('span.MuiTypography-root.TransferPortalItem_position__6sxbf MuiTypography-body1.MuiTypography-colorTextPrimary').innerText;
          //RATING
          player.rating = item.querySelector('div.TransferPortalItem_ratingsContainer_U0G5a > div.StarRating_starWrapper_Ofuoa > a.MuiTypography-root.MuiLink-root.MuiLink-underlineNone.StarRating_linkWrapper__RHR4l.MuiTypography-body1.MuiTypography-colorPrimary > span').innerText;
          //OLD SCHOOL
          const oldSchoolImageEle = item.querySelector('div.TransferPortalItem_statusContainer_Gw8ER > a.MuiTypography-root.MuiLink-root.MuiLink-underlineNone.TransferPortalItem_lastTeam__1zqJn.MuiTypography-colorPrimary > img');
          if (oldSchoolImageEle) {
            player.oldSchool = oldSchoolImageEle.getAttribute('title');
          } else {
            player.oldSchool = '';
          }
          //NEW SCHOOL
          const newSchoolImageEle = item.querySelector('div.TransferPortalItem_committedContainer__16ldp > a.MuiTypography-root.MuiLink-root.MuiLink-underlineNone.TransferPortalItem_committedLogoContainer__ftdQr.MuiTypography-colorPrimary > img');
          if (newSchoolImageEle) {
            player.newSchool = newSchoolImageEle.getAttribute('title');
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

  fs.writeFileSync('ncaaf.json', JSON.stringify(allPlayers, null, 2), (err) => {
    if (err) {
      console.error('An error occurred while writing to file.', err)
    } else {
      console.log('Finished writing to file.')
    }
  })
}
run();