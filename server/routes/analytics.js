const express = require("express");
const {
  getUserIncomeAndExpensesForAnalytics,
} = require("../controllers/analytics/hnadleAnalytics");
const router = express.Router();

router.get("/:id", getUserIncomeAndExpensesForAnalytics);

module.exports = router;
