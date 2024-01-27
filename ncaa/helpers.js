//RETURNS RATINGS FOR YEAR AND YEAR BEFORE
import axios from "axios";

const fetchJsonData = async (path) => {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const handleSchoolTransfers = async (year, sport, transferType) => {
  const adjustedYear = sport === "ncaab" ? year - 1 : year;
  const path = `./data/${sport}/stats/${adjustedYear}/${sport}_transfers_${adjustedYear}.json`;
  const transfers = await fetchJsonData(path);

  if (!transfers) return [];

  const schoolCounts = {};
  transfers.forEach((transfer) => {
    const school = transfer[transferType];
    schoolCounts[school] = (schoolCounts[school] || 0) + 1;
  });

  return Object.entries(schoolCounts).map(([name, count]) => ({ name, count }));
};

export const compareTeams = async (year1, year2, sport) => {
  try {
    const path1 = `./data/${sport}/stats/${year1}/team_stats_${year1}.json`;
    const path2 = `./data/${sport}/stats/${year2}/team_stats_${year2}.json`;

    const teamsYear1 = await fetchJsonData(path1);
    const teamsYear2 = await fetchJsonData(path2);

    const namesYear1 = new Set(teamsYear1.map((team) => team.name));
    const namesYear2 = new Set(teamsYear2.map((team) => team.name));

    const newTeamsYear2 = new Set(
      teamsYear2
        .filter((team) => !namesYear1.has(team.name))
        .map((team) => team.name)
    );
    const missingTeamsYear2 = [...namesYear1].filter(
      (name) => !namesYear2.has(name)
    );

    const ratingsYear1 = new Map(
      teamsYear1.map((team) => [team.name, team.rating])
    );

    const ratingsYear2 = new Map(
      teamsYear2.map((team) => [team.name, team.rating])
    );

    return {
      newTeamsYear2: [...newTeamsYear2],
      missingTeamsYear2: missingTeamsYear2,
      ratingsYear1: [...ratingsYear1],
      ratingsYear2: [...ratingsYear2],
    };
  } catch (err) {
    console.log(err);
  }
};

//# OF TRANSFERS FROM YEAR TO YEAR
export const schoolTransfersOut = (year, sport) =>
  handleSchoolTransfers(year, sport, "oldSchool");
export const schoolTransfersIn = (year, sport) =>
  handleSchoolTransfers(year, sport, "newSchool");

export const noNewSchools = async (year, sport) => {
  if (sport === "ncaab") {
    year = year - 1;
  }
  console.log("year", year);
  console.log("sport", sport);
  const path = `./data/${sport}/stats/${year}/${sport}_transfers_${year}.json`;
  const response = await fetch(path);
  const transferPlayer = await response.json();
  const total = transferPlayer.length;

  const player = transferPlayer.filter((player) => player.newSchool === "");
  const length = player.length;
  return [length, total];
};

//BASKETBALL PLAYER STATS
//new players
export const getTransfers = async (teamName, year, sport) => {
  const path = `./data/${sport}/stats/${year}/player_stats_${year}.json`;
  const data = await fetchJsonData(path);
  const flattenedData = data.flat();
  const filteredData = flattenedData.filter(
    (player) => player.school === teamName
  );
  console.log("filtered", filteredData);
  return filteredData;
};

//old players
export const getTransfersOut = async (teamName, year, sport) => {
  const pathYear = year - 1;
  try {
    const path = `./data/${sport}/stats/${pathYear}/prev_player_stats_${pathYear}.json`;

    const response = await fetch(path);
    if (!response.ok) {
      console.error("error");
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const flattenedData = data.flat();
    console.log("data", data);

    const filteredData = flattenedData.filter(
      (player) => player.oldSchool === teamName
    );
    console.log("filtered", filteredData);
    return filteredData;
  } catch (error) {
    console.error("Error fetching transfer data:", error);
    return [];
  }
};
//RETURNS TEAM STATS FOR YEARS
export const getTeamStats = async (teamName, year, sport) => {
  try {
    const prevYear = year - 1;

    const path1 = `./data/${sport}/stats/${year}/team_stats_${year}.json`;
    const path2 = `./data/${sport}/stats/${prevYear}/team_stats_${prevYear}.json`;

    const response1 = await fetch(path1);
    const teamsYear1 = await response1.json();
    const flattenedYear1 = teamsYear1.flat();

    const response2 = await fetch(path2);
    const teamsYear2 = await response2.json();
    const flattenedYear2 = teamsYear2.flat();

    const statsYear1 = flattenedYear1.filter((team) => team.name === teamName);
    const statsYear2 = flattenedYear2.filter((team) => team.name === teamName);

    return {
      statsYear1: statsYear1,
      statsYear2: statsYear2,
    };
  } catch (error) {
    console.error("Error fetching team stats:", error);
    return [];
  }
};

//FETCH FOOTBALL PLAYER STATS
export const getFootballPlayerStatsByParams = async (teamName, year) => {
  try {
    const response = await axios.get("http://localhost:4000/player/get", {
      params: {
        school_name: teamName,
        year: year,
      },
    });
    console.log(typeof response.data);
    if (typeof response.data === "string") {
      try {
        console.log("football player stats", JSON.parse(response.data));
        return JSON.parse(response.data);
      } catch (parseError) {
        console.error("Error parsing player stats:", parseError);
        return [];
      }
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching player stats:", error);
    return [];
  }
};
