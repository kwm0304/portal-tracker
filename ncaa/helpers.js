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
    console.log("New Teams in " + year2 + ":", newTeamsYear2);
    console.log(
      "Teams from " + year1 + " missing in " + year2 + ":",
      missingTeamsYear2
    );

    const ratingsYear1 = new Map(
      teamsYear1.map((team) => [team.name, team.rating])
    );

    const ratingsYear2 = new Map(
      teamsYear2.map((team) => [team.name, team.rating])
    );
    console.log("Ratings Year 1:", ratingsYear1);
    console.log("Ratings Year 2:", ratingsYear2);

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

export const schoolTransfersOut = async (year, sport) => {
  const pathYear = year - 1;
  const path1 = `./data/${sport}/stats/${pathYear}/${sport}_transfers_${pathYear}.json`;

  const response1 = await fetch(path1);
  const transfersYear1 = await response1.json();

  // Create an object to store the count of oldSchool occurrences
  const oldSchoolCounts = {};

  // Iterate over the transfers data
  transfersYear1.forEach((transfer) => {
    const oldSchool = transfer.oldSchool;
    if (oldSchool in oldSchoolCounts) {
      // Increment count if the school already exists in the object
      oldSchoolCounts[oldSchool]++;
    } else {
      // Initialize count for new schools
      oldSchoolCounts[oldSchool] = 1;
    }
  });

  // Convert the object into an array of {name, count}
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

  // Create an object to store the count of newSchool occurrences
  const newSchoolCounts = {};

  // Iterate over the transfers data
  transfersYear1.forEach((transfer) => {
    const newSchool = transfer.newSchool;
    if (newSchool in newSchoolCounts) {
      // Increment count if the school already exists in the object
      newSchoolCounts[newSchool]++;
    } else {
      // Initialize count for new schools
      newSchoolCounts[newSchool] = 1;
    }
  });

  // Convert the object into an array of {name, count}
  const newSchoolArray = Object.keys(newSchoolCounts).map((school) => ({
    name: school,
    count: newSchoolCounts[school],
  }));
  return newSchoolArray;
};
