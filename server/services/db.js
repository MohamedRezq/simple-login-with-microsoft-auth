import pkg from "pg";
import config from "./../../config.js";

const { Pool } = pkg;
const pool = new Pool(config.db);

// The general querying function (service) to PostgreSQL DB
async function dbQuery(query, params) {
  try {
    const { rows, fields } = await pool.query(query, params);
    return rows;
  } catch (error) {
    console.log("Error while querying DB: ", error);
    throw error;
  }
}

export default dbQuery;
