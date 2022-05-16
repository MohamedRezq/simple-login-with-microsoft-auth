import bcrypt from "bcrypt";
import { uuid } from "uuidv4";

// Import the DB Querying function
import dbQuery from "../services/db.js";
// Import the sendEmail function to help send verficiation emails
import sendEmail from "../services/email.js";
// Import createToken helper function to help generate tokens
import { createToken, MAX_AGE } from "./../helpers/jwt/tokenGenerator.js";
// Import two factor authentication to generate QR codes and OTPs
import twoFactor from "node-2fa";

// 1) signUpAccount: saves a new account to DB
const signUpAccount = async (req, res, next) => {
  // Generate UUID for the new user account
  const id = uuid();
  // Import the new account's data
  const { first_name, last_name, email, password } = req.body;
  // Hash the password before saving to DB (for security)
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    // Create token for email-verification which will be used to verify user's email address
    const emailVerifiedToken = createToken(email);
    // Run INSERT query to create a new user
    const result = await dbQuery(
      `INSERT INTO accounts_table (id, first_name, last_name, email, password, email_verified, email_verified_token) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [
        id,
        first_name,
        last_name,
        email,
        hashedPassword,
        false,
        emailVerifiedToken,
      ]
    );
    if (result?.length) {
      // Once the user is saved to the DB, an email will
      // be sent to the user to let him verify his email address
      await sendEmail(
        email,
        `${first_name} Email Validation`,
        `<p>To activate your account ${" "}
         <a href=http://localhost:4000/api/accounts/emailVerify/${emailVerifiedToken}>Click here</a>
         </p>`
      );
      res.status(200).json({ result });
      res.redirect("http://localhost:3000/");
    } else {
      res.status(400).json("Error while creating new account");
    }
  } catch (err) {
    res.status(500).json({ message: "Error connecting to DB" });
    next(err);
  }
};

// 2) checkAccount: checks the existence and email verification of a user who is trying to log-in
const checkAccount = async (req, res, next) => {
  // Get the email and password which the user has submitted in the "login" form
  const { email, password } = req.body;
  try {
    // Run SELECT query to get the user with the entered email address
    const accounts = await dbQuery(
      `SELECT * FROM accounts_table WHERE email='${email}'`
    );
    if (!accounts) {
      res.status(401).json({ message: "This email address is not registered" });
    } else {
      // If the email address exists in the DB, then check if the password is correct or not
      const isPasswordCorrect = await bcrypt.compare(
        password,
        accounts[0].password
      );
      if (!isPasswordCorrect) {
        res.status(404).json({ message: "Incorrect Password" });
      } else {
        // If the email and password are correct then finally check the email-verification
        if (accounts[0].email_verified === false) {
          res.status(404).json({ message: "Please verify your email address" });
        } else {
          res.status(200).json({ user: accounts[0] });
        }
      }
    }
  } catch (error) {
    console.log("Error happened during the sign-in process", error);
    res.status(500).json({ message: "This email address is not registered" });
  }
};

// 3) verifyAccount: runs when the user click the email-verificaion link
const verifyAccount = async (req, res) => {
  // Get the email-verification token from the email-verification link
  const { emailVerifiedToken } = req.params;
  try {
    const accounts = await dbQuery(
      `SELECT * FROM accounts_table WHERE email_verified_token='${emailVerifiedToken}'`
    );
    console.log("account", accounts[0])

    if (!accounts) {
      res.status(401).json({ message: "User is not registered" });
    } else {
      // If the user exists, then update his DB entry to be email-verified
      const verifiedAccount = await dbQuery(
        `UPDATE accounts_table SET email_verified = true WHERE email_verified_token='${emailVerifiedToken}'`
      );
      // Now the user is verified, then create JWT token to authorize his access to the routes
      const JWT_TOKEN = createToken(verifiedAccount.id);
      res.cookie("jwt", JWT_TOKEN, {
        maxAge: MAX_AGE * 1000, // In milliseconds
      });
      res.redirect("http://localhost:3000");
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

// 4) twoFactorAuth: generates QR code Uri and OTPs for
//    the user who is trying to login
const twoFactorAuth = async (req, res) => {
  // Get the id of the user who is trying to login.
  // this id will be used to generate the tokens
  const { id } = req.query;
  try {
    const accounts = await dbQuery(
      `SELECT * FROM accounts_table WHERE id='${id}'`
    );

    if (!accounts) {
      res.status(401).json({ message: "User is not registered" });
    } else {
      const newSecret = twoFactor.generateSecret(accounts[0]);
      const secretKey = newSecret.secret;
      // Generate (otpAuthUri) to generate the QR code
      const otpAuthUri = newSecret.uri;
      const genratedToken = twoFactor.generateToken(secretKey);
      // Generate the 6-digit otp token
      const otpToken = genratedToken.token;
      // Before the user is logged-in, JWT token is created
      // and sent to the user within cookies "jwt"
      const JWT_TOKEN = createToken(id);
      res.cookie("jwt", JWT_TOKEN, {
        maxAge: MAX_AGE * 1000, // In milliseconds
      });
      res.status(200).json({ otpAuthUri, otpToken });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

// Once the user is two-factor authenticated, his data should be
// sent to the browser to show it
const getUser = async (req, res) => {
  const { id } = req.query;
  try {
    const account = await dbQuery(
      `SELECT * FROM accounts_table WHERE id='${id}'`
    );
    res.status(200).json({ user: account[0] });
  } catch (error) {
    res.status(400).message({ error });
  }
};

export default {
  signUpAccount,
  checkAccount,
  verifyAccount,
  twoFactorAuth,
  getUser,
};
