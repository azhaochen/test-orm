import { createConnection, Connection } from "typeorm";
import { UserEntity } from "./user.entity";
import { DriverEntity } from "./driver.entity";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const SnakeNamingStrategy =
  require("typeorm-naming-strategies").SnakeNamingStrategy;

// Init connection, after that, you can use getConnection from anywhere
export async function initConnection() {
  await createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "web_server",
    password: "jerry",
    database: "postgres",
    namingStrategy: new SnakeNamingStrategy(),
    synchronize: false,
    logging: true,
    entities: ["**/*.entity.js"], // Must be .js; Nest typeorm can use autoLoadEntities to ignore this config option
    // migrations: [""],
    // subscribers: [""],
  }); // Auto load config in ormconfig.js
}
