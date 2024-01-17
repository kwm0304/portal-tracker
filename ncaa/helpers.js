//RETURNS RATINGS FOR YEAR AND YEAR BEFORE
export const compareTeams = async (year1, year2, sport) => {
  try {
    const path1 = `./data/${sport}/stats/${year1}/team_stats_${year1}.json`;
    const path2 = `./data/${sport}/stats/${year2}/team_stats_${year2}.json`;

    const response1 = await fetch(path1);
    const teamsYear1 = await response1.json();

    const response2 = await fetch(path2);
    const teamsYear2 = await response2.json();

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

    const undefinedTeams = new Set();

    teamsYear2.forEach((team) => {
      if (team.name === undefined) {
        undefinedTeams.add(team);
      }
    });

    if (undefinedTeams.size > 0) {
      console.log("Undefined Teams Found:", undefinedTeams.size);
    }

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
export const schoolTransfersOut = async (year, sport) => {
  const pathYear = year - 1;
  const path1 = `./data/${sport}/stats/${pathYear}/${sport}_transfers_${pathYear}.json`;

  const response1 = await fetch(path1);
  const transfersYear1 = await response1.json();

  const oldSchoolCounts = {};

  transfersYear1.forEach((transfer) => {
    const oldSchool = transfer.oldSchool;
    if (oldSchool in oldSchoolCounts) {
      oldSchoolCounts[oldSchool]++;
    } else {
      oldSchoolCounts[oldSchool] = 1;
    }
  });

  // obj -> array
  const oldSchoolArray = Object.keys(oldSchoolCounts).map((school) => ({
    name: school,
    count: oldSchoolCounts[school],
  }));
  return oldSchoolArray;
};

export const schoolTransfersIn = async (year, sport) => {
  const pathYear = year - 1;

  const path1 = `./data/${sport}/stats/${pathYear}/${sport}_transfers_${pathYear}.json`;

  const response1 = await fetch(path1);
  const transfersYear1 = await response1.json();

  const newSchoolCounts = {};

  transfersYear1.forEach((transfer) => {
    const newSchool = transfer.newSchool;
    if (newSchool in newSchoolCounts) {
      newSchoolCounts[newSchool]++;
    } else {
      // Initialize count for new schools
      newSchoolCounts[newSchool] = 1;
    }
  });

  // obj -> array
  const newSchoolArray = Object.keys(newSchoolCounts).map((school) => ({
    name: school,
    count: newSchoolCounts[school],
  }));
  return newSchoolArray;
};

//RETURNS PLAYERS THAT TRANSFERRED FROM YEAR TO YEAR
export const getTransfers = async (teamName, year, sport) => {
  try {
    const path = `./data/${sport}/stats/${year}/player_stats_${year}.json`;

    const response = await fetch(path);
    if (!response.ok) {
      console.error("error");
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const flattenedData = data.flat();

    const filteredData = flattenedData.filter(
      (player) => player.school === teamName
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
