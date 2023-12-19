import { launch } from "puppeteer";
import {  writeFileSync } from "fs";





// async function readAndProcessFile() {
//   try {
//     const jsonString = await readFileAsync(`./transfers/${sport}/${sport}_${year}.json`, 'utf8');

//     const data = JSON.parse(jsonString);
//     const playerNames = [];
//     for (const entry of data) {
//       playerNames.push({ firstName: entry.firstName, lastName: entry.lastName });
//     }

//     return playerNames;
//   } catch (error) {
//     console.error('Error:', error);
//     return []
//   }
// }

// readAndProcessFile();

async function scrapePlayer(browser, firstName, lastName) {
  const page = await browser.newPage();
  const year = 2023
  const url = `https://basketball.realgm.com/player/${firstName}-${lastName}/Summary/104443`;
  console.log('Visiting URL:', url);
  await page.goto(url);

  const lastTwoDigitString = year.toString().slice(-2);

  let pageData = await page.evaluate((lastTwoDigitString) => {
    let stats = [];
    let cells = Array.from(document.querySelectorAll('td.tablesaw-cell-persist'));
    cells.forEach(cell => {
      let season = cell.innerText.trim();
      let seasonYear = season.slice(-2);
      if (seasonYear === lastTwoDigitString) {
        let row = cell.parentElement;
        let rowData = Array.from(row.querySelectorAll('td')).map(td => td.innerText.trim());
        stats.push(rowData);
      }
    });
    return stats;
  }, lastTwoDigitString);

  await page.close();
  return pageData;
}

async function scrapePlayers(browser) {
  const allData = [];
  const playerNames = [
    {
      firstName: "Akok",
      lastName: "Akok",
    },
    {
      firstName: "Mike",
      lastName: "Meadows"
    }
  ]
  for (const player of playerNames) {
    const data = await scrapePlayer(browser, player.firstName, player.lastName);
    allData.push(data);
  }

  writeFileSync('./scrapedData.json', JSON.stringify(allData), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Success!');
    }
  });
  
}

async function main() {
  const browser = await launch({ headless: false });
  await scrapePlayers(browser);
  await browser.close();
}
main()
