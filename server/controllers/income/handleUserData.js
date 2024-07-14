const Account = require("../../models/Account");
const { getWeekRange } = require("../../utils/dates");

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
  try {
    const ss = await Account.findById(req.params.id);
    const qq = req.query;
    if (ss) {
      let query = "";
      let start;
      let end;
      if (qq.hasOwnProperty("d") && qq["d"] == "today") {
        start = new Date();
        start.setHours(0, 0, 0, 0);

        end = new Date();
        end.setHours(23, 59, 59, 999);
      } else if (qq.hasOwnProperty("d") && qq["d"] == "last7") {
        end = new Date();
        start = new Date();
        start.setDate(end.getDate() - 7);
      } else if (qq.hasOwnProperty("m") && qq["m"] == "month") {
        start = new Date();
        start.setDate(1);
        start.setHours(0, 0, 0, 0);

        end = new Date();
        end.setMonth(end.getMonth() + 1);
        end.setDate(1);
        end.setHours(0, 0, 0, 0);
      } else if (
        qq.hasOwnProperty("m") &&
        qq.hasOwnProperty("y") &&
        qq.hasOwnProperty("w")
      ) {
        const week = getWeekRange(qq?.y, qq?.m, qq?.w);
        if (week.error)
          return res.status(400).json({
            success: false,
            message: week.error,
          });

        start = week.start;
        end = week.end;
      } else if (qq.hasOwnProperty("m") && qq.hasOwnProperty("y")) {
        start = new Date(qq?.y, qq?.m - 1, 1);
        end = new Date(qq?.y, qq?.m, 1);
      }

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
