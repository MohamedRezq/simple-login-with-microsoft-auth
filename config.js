const config = {
  db: {
    user: "admin",
    host: "localhost",
    database: "accountsDB",
    password: "admin",
    port: 5432,
    testTable: "accounts_Table", // Any Table name in the DB for testing connection before running the app
  },
};

export default config;
