const Income = require("../../models/Income");
const Expense = require("../../models/Expense");
const Account = require("../../models/Account");
const mongoose = require("mongoose");
const { getCalendarPeriods } = require("../../utils/dates");

exports.getUserIncomeAndExpensesForAnalytics = async (req, res) => {
  try {
    const ss = await Account.findById(req.params.id);
    const qq = req.query;
    let totalIncomeResult = 0;
    let totalExpenseResult = 0;

    if (ss === null) {
      res.status(400).json({
        success: false,
        message: "Unauthorized User",
      });
      return;
    }

    if (qq.hasOwnProperty("type") && qq["type"] === "expVinc") {
      if (qq.hasOwnProperty("date") && qq["date"] === "true") {
        let startDate = getCalendarPeriods(qq)[0];
        let endDate = getCalendarPeriods(qq)[1];

        totalIncomeResult = await Income.aggregate([
          {
            $match: {
              user: mongoose.Types.ObjectId(req.params.id),
              date: {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
              },
            },
          },
          {
            $group: {
              _id: null,
              totalAmount: { $sum: "$amount" },
            },
          },
        ]);

        totalExpenseResult = await Expense.aggregate([
          {
            $match: {
              user: mongoose.Types.ObjectId(req.params.id),
              date: {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
              },
            },
          },
          {
            $group: {
              _id: null,
              totalAmount: { $sum: "$amount" },
            },
          },
        ]);
      } else {
        totalIncomeResult = await Income.aggregate([
          {
            $match: { user: mongoose.Types.ObjectId(req.params.id) },
          },
          {
            $group: {
              _id: null,
              totalAmount: { $sum: "$amount" },
            },
          },
        ]);

        totalExpenseResult = await Expense.aggregate([
          {
            $match: { user: mongoose.Types.ObjectId(req.params.id) },
          },
          {
            $group: {
              _id: null,
              totalAmount: { $sum: "$amount" },
            },
          },
        ]);
      }

      const totalIncome =
        totalIncomeResult.length > 0 ? totalIncomeResult[0].totalAmount : 0;

      const totalExpense =
        totalExpenseResult.length > 0 ? totalExpenseResult[0].totalAmount : 0;

      res.status(200).json({
        success: true,
        totalExpense,
        totalIncome,
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
