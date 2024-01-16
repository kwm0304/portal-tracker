//WRITES PLAYER STATS TO FILE
import { launch } from "puppeteer";
import { writeFileSync, promises as fs } from "fs";

async function readAndProcessFile() {
  const sport = "ncaab";
  const year = 2023;
  try {
    const jsonString = await fs.readFile(
      `./transfers/${sport}/${sport}_${year}.json`,
      "utf8"
    );
    const data = JSON.parse(jsonString);
    const playerNames = [];
    for (const entry of data) {
      let schoolFormatted = entry.newSchool.replace(/[&.'"]/g, "");
      switch (schoolFormatted) {
        case "TCU":
          schoolFormatted = "Texas Christian";
          break;
        case "LSU":
          schoolFormatted = "Louisiana State";
          break;
        case "UTEP":
          schoolFormatted = "Texas El Paso";
          break;
        case "UTSA":
          schoolFormatted = "Texas San Antonio";
          break;
        case "FIU":
          schoolFormatted = "Florida International";
          break;
        case "FAU":
          schoolFormatted = "Florida Atlantic";
          break;
        case "UNC Wilmington":
          schoolFormatted = "North Carolina Wilmington";
          break;
        case "UNC Greensboro":
          schoolFormatted = "North Carolina Greensboro";
          break;
        case "UCF":
          schoolFormatted = "Central Florida";
          break;
        case "USC":
          schoolFormatted = "Southern California";
          break;
        case "Ole Miss":
          schoolFormatted = "Mississippi";
          break;
        case "UNLV":
          schoolFormatted = "Nevada Las Vegas";
          break;
        case "St Johns":
          schoolFormatted = "St Johns NY";
          break;
        case "UMass":
          schoolFormatted = "Massachusetts";
          break;
        case "UMKC":
          schoolFormatted = "Missouri Kansas City";
          break;
        case "UTRGV":
          schoolFormatted = "Texas Rio Grande Valley";
          break;
        case "UMBC":
          schoolFormatted = "Maryland Baltimore County";
          break;
        case "UT-Arlington":
          schoolFormatted = "Texas Arlington";
          break;
        case "UT Martin":
          schoolFormatted = "Tennessee Martin";
          break;
        case "UNC Asheville":
          schoolFormatted = "North Carolina Asheville";
          break;
        case "SMU":
          schoolFormatted = "Southern Methodist";
          break;
        case "NC State":
          schoolFormatted = "North Carolina State";
          break;
        case "UAB":
          schoolFormatted = "Alabama Birmingham";
          break;
        case "Miami":
          schoolFormatted = "Miami FL";
          break;
        case "VCU":
          schoolFormatted = "Virginia Commonwealth";
          break;
        case "Wisconsin-Milwaukee":
          schoolFormatted = "Milwaukee";
          break;
        case "Wisconsin-Green Bay":
          schoolFormatted = "Green Bay";
          break;
        case "The Citadel":
          schoolFormatted = "Citadel";
          break;
        case "UC Santa Barbara":
          schoolFormatted = "California Santa Barbara";
          break;
        case "Arkansas-Little Rock":
          schoolFormatted = "Arkansas Little Rock";
          break;
        case "William  Mary":
          schoolFormatted = "William Mary";
          break;
        case "USF":
          schoolFormatted = "South Florida";
          break;
        case "Southern Miss":
          schoolFormatted = "Southern Mississippi";
          break;
        case "Bowling Green":
          schoolFormatted = "Bowling Green State";
          break;
        case "University of the Pacific":
          schoolFormatted = "Pacific";
          break;
        case "Albany":
          schoolFormatted = "Albany NY";
          break;
        case "Detroit":
          schoolFormatted = "Detroit Mercy";
          break;
        case "Loyola":
          schoolFormatted = "Loyola Il";
          break;
        case "UC Irvine":
          schoolFormatted = "California Irvine";
          break;
        case "Grambling State":
          schoolFormatted = "Grambling";
          break;
        case "Miami (OH)":
          schoolFormatted = "Miami Oh";
          break;
        case "UC Davis":
          schoolFormatted = "California Davis";
          break;
        case "Middle Tennessee State":
          schoolFormatted = "Middle Tennessee";
          break;
        case "Saint Marys":
          schoolFormatted = "Saint Marys CA";
          break;
        case "Prairie View AM":
          schoolFormatted = "Prairie View";
          break;
        case "Louisiana":
          schoolFormatted = "Louisiana Lafayette";
          break;
        case "Southern University":
          schoolFormatted = "Southern";
          break;
        case "UC Riverside":
          schoolFormatted = "California Riverside";
          break;
        case "SIU Edwardsville":
          schoolFormatted = "Southern Illinois Edwardsville";
          break;
        case "Texas-Rio Grande Valley":
          schoolFormatted = "Texas Pan American";
          break;
        case "Bethune-Cookman":
          schoolFormatted = "Bethune Cookman";
          break;
      }
      playerNames.push({
        firstName: entry.firstName,
        lastName: entry.lastName,
        school: schoolFormatted,
      });
    }
    console.log("Player names:", playerNames.length);

    return playerNames;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

readAndProcessFile();

// Will search ^ year + 1
async function scrapePlayer(browser, firstName, lastName, school) {
  const page = await browser.newPage();
  const schoolName = school.toLowerCase().replace(/ /g, "-");
  const year = 2024;
  const url = `https://www.sports-reference.com/cbb/schools/${schoolName}/men/${year}.html`;

  await page.goto(url);
  await page.setDefaultTimeout(60000);
  await page.waitForSelector("table#per_game");

  let pageData = await page.evaluate(
    (lastName, firstName, school) => {
      let stats = [];
      let rows = Array.from(
        document.querySelectorAll("table#per_game tr")
      ).filter((tr) => {
        let link = tr.querySelector('td[data-stat="player"] a');
        if (link) {
          return link.textContent.trim().endsWith(lastName);
        }
        return false;
      });

      rows.forEach((row) => {
        let player = {};

        try {
          player.firstName = firstName;

          player.lastName = lastName;

          player.school = school;
          let games = row.querySelector('td[data-stat="games"]').innerText;
          player.games = games === "" ? 0 : +games;

          let gamesStarted = row.querySelector(
            'td[data-stat="games_started"]'
          ).innerText;
          player.gamesStarted = gamesStarted === "" ? 0 : +gamesStarted;

          let fgm = row.querySelector('td[data-stat="fg_per_g"]').innerText;
          player.fgm = fgm === "" ? 0 : +fgm;

          let fga = row.querySelector('td[data-stat="fga_per_g"]').innerText;
          player.fga = fga === "" ? 0 : +fga;

          let fgPercent = row.querySelector('td[data-stat="fg_pct"]').innerText;
          player.fgPercent = fgPercent === "" ? 0 : +fgPercent;

          let fg2m = row.querySelector('td[data-stat="fg2_per_g"]').innerText;
          player.fg2m = fg2m === "" ? 0 : +fg2m;

          let fg2a = row.querySelector('td[data-stat="fg2a_per_g"]').innerText;
          player.fg2a = fg2a === "" ? 0 : +fg2a;

          let fg2Percent = row.querySelector(
            'td[data-stat="fg2_pct"]'
          ).innerText;
          player.fg2Percent = fg2Percent === "" ? 0 : +fg2Percent;

          let fg3m = row.querySelector('td[data-stat="fg3_per_g"]').innerText;
          player.fg3m = fg3m === "" ? 0 : +fg3m;

          let fg3a = row.querySelector('td[data-stat="fg3a_per_g"]').innerText;
          player.fg3a = fg3a === "" ? 0 : +fg3a;

          let fg3Percent = row.querySelector(
            'td[data-stat="fg3_pct"]'
          ).innerText;
          player.fg3Percent = fg3Percent === "" ? 0 : +fg3Percent;

          let ftm = row.querySelector('td[data-stat="ft_per_g"]').innerText;
          player.ftm = ftm === "" ? 0 : +ftm;

          let fta = row.querySelector('td[data-stat="fta_per_g"]').innerText;
          player.fta = fta === "" ? 0 : +fta;

          let ftPercent = row.querySelector('td[data-stat="ft_pct"]').innerText;
          player.ftPercent = ftPercent === "" ? 0 : +ftPercent;

          let reb = row.querySelector('td[data-stat="trb_per_g"]').innerText;
          player.reb = reb === "" ? 0 : +reb;

          let ast = row.querySelector('td[data-stat="ast_per_g"]').innerText;
          player.ast = ast === "" ? 0 : +ast;

          let stl = row.querySelector('td[data-stat="stl_per_g"]').innerText;
          player.stl = stl === "" ? 0 : +stl;

          let blk = row.querySelector('td[data-stat="blk_per_g"]').innerText;
          player.blk = blk === "" ? 0 : +blk;

          let tov = row.querySelector('td[data-stat="tov_per_g"]').innerText;
          player.tov = tov === "" ? 0 : +tov;

          let pts = row.querySelector('td[data-stat="pts_per_g"]').innerText;
          player.pts = pts === "" ? 0 : +pts;
        } catch (err) {
          console.log(err);
        }
        stats.push(player);
      });
      console.log("Stats:", stats);
      return stats;
    },
    lastName,
    firstName,
    school
  );

  await page.close();
  console.log(pageData);
  return pageData;
}

async function scrapePlayers(browser) {
  const allData = [];
  const playerNames = await readAndProcessFile();
  const batchSize = 100;
  let playerCounter = 0;

  for (let i = 0; i < playerNames.length; i += batchSize) {
    const batch = playerNames.slice(i, i + batchSize);
    for (const player of batch) {
      if (!player.school || !player.school.trim() === "" || !player.lastName) {
        console.log(`Skipping ${player.firstName} ${player.lastName}`);
        continue;
      }
      playerCounter++;
      console.log(
        `Processing player #${playerCounter}: ${player.firstName} ${player.lastName}, ${player.school}`
      );
      const data = await scrapePlayer(
        browser,
        player.firstName,
        player.lastName,
        player.school
      );
      allData.push(data);
    }
    writeFileSync(
      `./data/ncaab/stats/player_stats_2024_batch_${i / batchSize}.json`,
      JSON.stringify(allData, null, 2),
      (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`Batch ${i / batchSize} Success!`);
        }
      }
    );
  }
}

async function main() {
  const browser = await launch();
  await scrapePlayers(browser);
  await browser.close();
}
main();