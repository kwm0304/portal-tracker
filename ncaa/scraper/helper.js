import { readFileSync } from "fs";

function readAndCompareFiles(sport, year1, year2) {
  const transferList = JSON.parse(
    readFileSync(`./transfers/${sport}/${sport}_${year1}.json`, "utf8")
  );
  const statsList = JSON.parse(
    readFileSync(
      `./data/${sport}/stats/${year2}/player_stats_${year2}.json`,
      "utf8"
    )
  );

  const flattenedStatsList = statsList.flat();

  const playersNotInStats = transferList.filter((transferPlayer) => {
    return !flattenedStatsList.some(
      (statsPlayer) =>
        statsPlayer.firstName === transferPlayer.firstName &&
        statsPlayer.lastName === transferPlayer.lastName
    );
  });

  let noNewSchool = [];
  const playersWithNoNewSchool = transferList.filter(
    (transferPlayer) => transferPlayer.newSchool === ""
  );
  noNewSchool.push(playersWithNoNewSchool);
  console.log(noNewSchool);

  return playersNotInStats.map((player) => ({
    firstName: player.firstName,
    lastName: player.lastName,
    newSchool: player.newSchool,
  }));
}

function processMultipleYears(sport, yearPairs) {
  const results = {};

  yearPairs.forEach(([year1, year2]) => {
    results[`${year1}-${year2}`] = readAndCompareFiles(sport, year1, year2);
  });

  return results;
}

const sport = "ncaab";
const yearPairs = [
  ["2020", "2021"],
  ["2021", "2022"],
  ["2022", "2023"],
  ["2023", "2024"],
];
const results = processMultipleYears(sport, yearPairs);

for (const [key, value] of Object.entries(results)) {
  console.log(`${key}: Size of array is ${value.length}`);
}
