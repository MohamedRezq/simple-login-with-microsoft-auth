import pkg from "pg";
const { Client } = pkg;

import config from "./../../config.js";

// Import DB configuration from global config.js
const dbConfig = config.db;
// Create PSQL client to help run createTableQuery
const client = new Client(dbConfig);

// Query to create table for accounts
// will run only if the table doesn't already exist
const createAccountsTableQuery = `
    CREATE TABLE IF NOT EXISTS ${dbConfig.testTable} (
	    "id" VARCHAR(100) NOT NULL UNIQUE,
	    "first_name" VARCHAR(100) NOT NULL,
	    "last_name" VARCHAR(100) NOT NULL,
      "email" VARCHAR(100) NOT NULL UNIQUE,
      "password" VARCHAR(100) NOT NULL,
      "email_verified" BOOLEAN,
      "email_verified_token" VARCHAR(300) NOT NULL UNIQUE,
	     PRIMARY KEY ("id")
    );`;

// The entry function to check Postgres DB connection
// Then create accounts table if it doesn't exist
const startPsqlDB = async (query = createAccountsTableQuery) => {
  try {
    // Test connection to Postgres DB
    await client.connect();
    // Run a test query to get current time
    const now = await client.query("SELECT NOW()");
    console.log(`DB with name (${dbConfig.database}) exists`);
    // Since DB connection is successful, create accounts table if it doesn't exist
    createAccountsTable(query);
    return now;
  } catch (error) {
    throw `No DB found with this name: ${dbConfig.database}\nPlease create it firstly`;
  }
};

const createAccountsTable = async (query) => {
  // Run createAccountsTableQuery to create the table if it doesn't exist
  await client.query(query);
  // Safely end the PSQL client session after creating the table
  await client.end();
};

export default startPsqlDB;
