import { Options } from "sequelize";
import { Sequelize, ModelCtor } from "sequelize-typescript";
import { setDB, getDB } from "./db";
import { User } from "./user";
import { Driver } from "./driver";

const credentials = {
  host: "localhost", //
  database: "postgres", // process.env.PG_DATABASE,
  username: "web_server", // process.env.PG_USERNAME,
  password: "jerry", // process.env.PG_PASSWORD,
};

export interface ModelByName {
  User: typeof User;
  Driver: typeof Driver;
}

export const models = [User, User];

export const model = <T extends keyof ModelByName>(
  modelName: T
): ModelByName[T] => getDB().model(modelName) as ModelByName[T];

/**
 * Initialize Sequelize.
 *
 * @param models - Array of models.
 */
export const initSequelize = (
  models: ModelCtor[],
  opts: Options
): Sequelize => {
  return new Sequelize({
    dialect: "postgres",
    models,
    // Prevent sequelize add set query on every connection which will cause RDS proxy pinned.
    // https://github.com/getjerry/jerry2/pull/6369
    // Sequelize v5 have bug of not setting these 2 fields correctly
    clientMinMessages: false,
    keepDefaultTimezone: true,
    // underscored: true, // snake_case https://sequelize.org/docs/v6/other-topics/naming-strategies/, https://stackoverflow.com/questions/51885914/sequelize-underscored-option-not-functioning-as-expected
    ...opts,
  } as Options);
};

// TODO: remove unnecessary associations
export const initDB = () => {
  let db = initSequelize(models, {
    replication: {
      read: [
        {
          ...credentials,
        },
      ],
      write: {
        ...credentials,
      },
    },
    pool: { max: 5 },
    dialectOptions: {
      application_name: "ezlynx-data",
    },
    ...(process.env.NODE_ENV === "test" ? { logging: false } : {}),
  });

  db.addModels(models);

  setDB(db);
  return db;
};
