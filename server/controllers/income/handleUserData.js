const Account = require("../../models/Account");
const { getWeekRange, getCalendarPeriods } = require("../../utils/dates");

exports.getUserDetails = async (req, res) => {
  try {
    const incomes = await Account.findById(req.params.id)
      .select("username role")
      .populate({
        path: "incomes",
        select: "description amount category date source note -user",
        populate: {
          path: "category",
          select: "name -_id",
        },
      })
      .populate({
        path: "bankaccounts",
        select: "name balance -user",
      })
      .populate({
        path: "credits",
        select:
          "description amount dueDate creditor type interestRate paymentMethod paid -user",
        populate: {
          path: "creditor",
          select: "name -_id",
        },
      })
      .populate({
        path: "savings",
        select:
          "name description balance targetAmount targetDate depositFrequency -user",
      })
      .populate({
        path: "expenses",
        select:
          "description amount date category paymentMethod paidTo isRecurring -user",
        populate: [
          { path: "category", select: "name -_id" },
          {
            path: "bankAccountId",
            select: "name -_id",
          },
        ],
      })
      .populate({
        path: "subs",
        select:
          "name description price bullingCycle startDate endDate isActive -user",
      })
      .exec();
    if (incomes) res.status(200).json(incomes);
    else {
      res.status(400).json({
        success: false,
        message: "No Records Found for the user",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserExpensesAndIncomes = async (req, res) => {
  const limit = 10;

  try {
    const ss = await Account.findById(req.params.id);
    const qq = req.query;
    if (ss) {
      let query = "";
      let start = getCalendarPeriods(qq)[0];
      let end = getCalendarPeriods(qq)[1];

      query = { date: { $gte: start, $lt: end } };

      const result = await Account.findById(req.params.id)
        .select("username role")
        .populate({
          path: "incomes",
          select: "description amount category date source note -user",
          populate: {
            path: "category",
            select: "name -_id",
          },
          match: query,
          options: {
            sort: { date: -1 },
          },
        })
        .populate({
          path: "expenses",
          select:
            "description amount date category paymentMethod paidTo isRecurring -user",
          populate: [
            { path: "category", select: "name -_id" },
            {
              path: "bankAccountId",
              select: "name -_id",
            },
          ],
          match: query,
          options: {
            sort: { date: -1 },
          },
        })
        .exec();
      res.status(200).json(result);
    } else {
      res.json({
        success: false,
        message: "Unable to find the User.",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
