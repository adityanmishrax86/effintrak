const express = require("express");
const {
  getUserDetails,
  getUserExpensesAndIncomes,
} = require("../controllers/income/handleUserData");
const { getAllAccounts } = require("../controllers/income/handleBankAccount");

const router = express.Router();

router.get("/me/:id", getUserDetails);

router.get("/accounts/:id", getAllAccounts);

router.get("/ac/:id", getUserExpensesAndIncomes);

module.exports = router;
