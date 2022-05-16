import express from "express";

import accountQueries from "./../db/accounts.js";

const router = express.Router();

router.post("/api/accounts/signup", accountQueries.signUpAccount);
router.post("/api/accounts/signin", accountQueries.checkAccount);
router.get("/api/accounts/emailVerify/:emailVerifiedToken", accountQueries.verifyAccount);
router.get("/api/accounts/twoFactorAuthenticator", accountQueries.twoFactorAuth);
router.get("/api/accounts/getUser", accountQueries.getUser);

export default router;
