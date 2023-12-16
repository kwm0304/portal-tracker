export const compareTeams = async (year1, year2, sport) => {
  try {
    const path1 = `./data/${sport}/${sport}_stats_${year1}.json`;
    const path2 = `./data/${sport}/${sport}_stats_${year2}.json`;

    const response1 = await fetch(path1);
    const teamsYear1 = await response1.json();

    const response2 = await fetch(path2);
    const teamsYear2 = await response2.json();

    const namesYear1 = new Set(teamsYear1.map(team => team.name));
    const namesYear2 = new Set(teamsYear2.map(team => team.name));

    const newTeamsYear2 = new Set(teamsYear2.filter(team => !namesYear1.has(team.name)).map(team => team.name));
    const missingTeamsYear2 = [...namesYear1].filter(name => !namesYear2.has(name));
    console.log("New Teams in " + year2 + ":", newTeamsYear2);
    console.log("Teams from " + year1 + " missing in " + year2 + ":", missingTeamsYear2);

    // Creating a map for year1 data for quick access
    const ratingsYear1 = new Map(teamsYear1.map(team => [team.name, team.rating]));

    const undefinedTeams = new Set();

    teamsYear2.forEach(team => {
      if (team.name === undefined) {
        undefinedTeams.add(team);
      }
    });

    if (undefinedTeams.size > 0) {
      console.log("Undefined Teams Found:", undefinedTeams.size);
    }

    // Calculating rating differences
    let ratingDifferences = teamsYear2.reduce((acc, teamYear2) => {
     
      // Check if the team is new in year2
      if (newTeamsYear2.has(teamYear2.name)) {
        acc.push({ name: teamYear2.name, status: `New to D1 in ${year2}` });
      } else {
        const ratingYear1 = ratingsYear1.get(teamYear2.name) || 0;
        acc.push({
          name: teamYear2.name,
          ratingDifference: teamYear2.rating - ratingYear1
        });
      }
      return acc;
    }, []);

    // Sorting by rating differences
    ratingDifferences.sort((a, b) => (b.ratingDifference || 0) - (a.ratingDifference || 0));

    return {
      newTeamsYear2: [...newTeamsYear2],
      missingTeamsYear2: missingTeamsYear2,
      ratingDifferences: ratingDifferences,
    }
  } catch (err) {
    console.log(err);
  }
};

export const schoolTransfersOut = async (year, sport) => {
  const path1 = `./transfers/${sport}/${sport}_${year}.json`;

  const response1 = await fetch(path1);
  const transfersYear1 = await response1.json();

  // Create an object to store the count of oldSchool occurrences
  const oldSchoolCounts = {};

  // Iterate over the transfers data
  transfersYear1.forEach(transfer => {
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
  const oldSchoolArray = Object.keys(oldSchoolCounts).map(school => ({
    name: school,
    count: oldSchoolCounts[school]
  }));
  return oldSchoolArray;
};


export const schoolTransfersIn = async (year, sport) => { 
  const path1 = `./transfers/${sport}/${sport}_${year}.json`;

  const response1 = await fetch(path1);
  const transfersYear1 = await response1.json();

  // Create an object to store the count of newSchool occurrences
  const newSchoolCounts = {};

  // Iterate over the transfers data
  transfersYear1.forEach(transfer => {
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
  const newSchoolArray = Object.keys(newSchoolCounts).map(school => ({
    name: school,
    count: newSchoolCounts[school]
  }));
  return newSchoolArray;
}
