import { promises as fs } from "fs";

const addOldSchool = async () => {
  try {
    const file1 = "./data/ncaab/stats/2020/ncaab_transfers_2020.json";
    const file2 = "./data/ncaab/stats/2021/player_stats_2021.json";

    const data1 = JSON.parse(await fs.readFile(file1, "utf8"));
    const data2 = JSON.parse(await fs.readFile(file2, "utf8"));

    const flatData2 = data2.flat();

    flatData2.forEach((file2Player) => {
      data1.forEach((file1Player) => {
        if (
          file2Player.firstName === file1Player.firstName &&
          file2Player.lastName === file1Player.lastName
        ) {
          file2Player.oldSchool = file1Player.oldSchool;
        }
      });
    });

    await fs.writeFile(file2, JSON.stringify(data2, null, 2));

    console.log("File updated successfully");
  } catch (err) {
    console.error(err);
  }
};

addOldSchool();
