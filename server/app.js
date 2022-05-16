import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import AccountsRoutes from "./routes/accounts.js";
import startPsqlDB from "./db/starter.js";

dotenv.config();

// Configure the express app
const app = express();

// Limit POST data size from browser to API (Generally)
const POST_SIZE_LIMIT = "30mb";

// Define the REACT APP url for CORS policy authorization
const APP_HOME_URL = "http://localhost:3000";

// Allow Cross-Origin requests with the REACT APP
const corsOptions = {
  origin: APP_HOME_URL,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

// Define the required middlewares to be used
app.use(bodyParser.json({ limit: POST_SIZE_LIMIT, extended: true }));
app.use(bodyParser.urlencoded({ limit: POST_SIZE_LIMIT, extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());

// Define the routes to be used within the API
app.use(AccountsRoutes);

// Run the API on the following port
const PORT = process.env.API_PORT || 4000;

// If the DB connection is successful, then run the app
startPsqlDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on PORT:`, PORT);
    });
  })
  .catch((err) => {
    console.log("App couldn't start: ", err);
  });
