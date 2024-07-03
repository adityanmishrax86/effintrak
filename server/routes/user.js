const express = require("express");
const { getUserDetails } = require("../controllers/income/handleUserData");
const { getAllAccounts } = require("../controllers/income/handleBankAccount");

const router = express.Router();

router.get("/me/:id", getUserDetails);

router.get("/accounts/:id", getAllAccounts);

module.exports = router;
