import { Sequelize } from "sequelize-typescript";

let db: Sequelize;

export const getDB = () => db;

/**
 * HACK: set db to a Sequelize instance
 * This allows us to extend the models defined here in our apps
 * and then pull the models from our libs
 */
export const setDB = (database: Sequelize) => {
  db = database;
};

export const closeDB = () => db.close();
