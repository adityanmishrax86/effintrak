const express = require("express");
const {
  createIncome,
  getIncomes,
  getIncomeById,
  updateIncome,
  deleteIncome,
} = require("../controllers/income/handleIncome");
const {
  createCategory,
  getCategories,
  getCategoryById,
  deleteCategory,
} = require("../controllers/income/handleCategories");
const {
  getBalance,
  updateBalance,
  createBankAccount,
} = require("../controllers/income/handleBankAccount");
const {
  getCreditById,
  createCredit,
  updateCredit,
} = require("../controllers/income/handleCredit");
const {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  updateAllExpense,
} = require("../controllers/income/handleExpense");
const {
  createSaving,
  getSavings,
  getSavingById,
  updateSaving,
} = require("../controllers/income/handleSavings");
const {
  createSubscription,
  getAllSubscriptions,
  getSubscriptionById,
  updateSubscription,
  deleteSubscription,
  cancelSubscription,
  renewSubscription,
} = require("../controllers/income/handleSubscription");

const router = express.Router();

//incomes
router.post("/incomes", createIncome);
router.get("/incomes", getIncomes);
router.get("/incomes/:id", getIncomeById);
router.put("/incomes/:id", updateIncome);
router.delete("/incomes/:id", deleteIncome);

// categories
router.post("/categories", createCategory);
router.get("/categories", getCategories);
router.get("/categories/:id", getCategoryById);
router.delete("/categories/:id", deleteCategory);

router.get("/bankBalance/:id", getBalance);
router.post("/bankBalance", createBankAccount);
router.put("/bankBalance/:id", updateBalance);

router.get("/credit/:id", getCreditById);
router.post("/credit", createCredit);
router.put("/credit/:id", updateCredit);

router.post("/expense", createExpense);
router.get("/expense", getExpenses);
router.get("/expense/:id", getExpenseById);
router.put("/expense/:id", updateExpense);
router.get("/expenseUpdate", updateAllExpense);

router.post("/savings", createSaving);
router.get("/savings", getSavings);
router.get("/savings/:id", getSavingById);
router.put("/savings/:id", updateSaving);

router.post("/subs", createSubscription);
router.get("/subs", getAllSubscriptions);
router.get("/subs/:id", getSubscriptionById);
router.put("/subs/:id", updateSubscription);
router.delete("/subs/:id", deleteSubscription);
router.put("/subs/:id/cancel", cancelSubscription);
router.put("/subs/:id/renew", renewSubscription);

module.exports = router;
