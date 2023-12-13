import { readFile } from 'fs';

const readJsonFile = (path) => new Promise((resolve, reject) => {
  readFile(path, 'utf8', (err, data) => {
    if (err) {
      reject("File read failed: " + err);
    } else {
      try {
        resolve(JSON.parse(data));
      } catch (parseErr) {
        reject("Error parsing JSON: " + parseErr);
      }
    }
  });
});

const compareTeams = async () => {
  try {
    const teams2020 = await readJsonFile('./data/ncaab/ncaab_stats_2020.json');
    const teams2021 = await readJsonFile('./data/ncaab/ncaab_stats_2021.json');

    const names2020 = new Set(teams2020.map(team => team.name));
    const newD1Teams2021 = new Set(teams2021.filter(team => !names2020.has(team.name)).map(team => team.name));

    // Creating a map for 2020 data for quick access
    const ratings2020 = new Map(teams2020.map(team => [team.name, team.rating]));

    // Calculating rating differences
    let ratingDifferences = teams2021.reduce((acc, team2021) => {
      // Check if the team is new to D1
      if (newD1Teams2021.has(team2021.name)) {
        acc.push({ name: team2021.name, status: "New to D1" });
      } else {
        const rating2020 = ratings2020.get(team2021.name) || 0;
        acc.push({
          name: team2021.name,
          ratingDifference: team2021.rating - rating2020
        });
      }
      return acc;
    }, []);

    // Sorting by rating differences
    ratingDifferences.sort((a, b) => (b.ratingDifference || 0) - (a.ratingDifference || 0));

    console.log(ratingDifferences);
  } catch (err) {
    console.log(err);
  }
};

compareTeams();