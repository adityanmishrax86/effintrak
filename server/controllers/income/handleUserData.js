const Account = require("../../models/Account");

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
