import "reflect-metadata"; // https://typeorm.bootcss.com/
import { map, get } from "lodash";
import { getConnection } from "typeorm";
import { initDB, model } from "./src/sequelize/index";
import { getDB } from "./src/sequelize/db";
import { initConnection } from "./src/typeorm/index";
import { UserEntity } from "./src/typeorm/user.entity";

initDB(); // init sequelize
// initConnection(); // init typeorm

async function test1() {
  const aaa = await getDB().model("User").create({
    realName: "User One",
    realAge: 20,
  });
  console.log("aaa", aaa); // Auto insert created_at, returning *
}

async function test2() {
  const read = await getDB().model("User").findAll();
  console.log(map(read, (v) => get(v, "dataValues"))); // get(read[0], "dataValues")
}

async function test3() {
  await initConnection(); // init typeorm
  const data = await getConnection().getRepository(UserEntity).find();
  console.log("find all", data);
  const dataNew = await getConnection()
    .getRepository(UserEntity)
    .save({ id: 1, realName: "User one" });
  console.log("save return", dataNew); // This won't return all column values
  console.log(
    "preload",
    await getConnection().getRepository(UserEntity).preload({ id: dataNew.id }) // Can always use saveResult.id to get all values
  );
}

test3();
