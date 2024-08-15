const BankAccount = require("../../models/BankAccount");
const Expense = require("../../models/Expense");
const Category = require("../../models/Category");

exports.createExpense = async (req, res) => {
  try {
    const newExpense = new Expense(req.body);
    const savedExpense = await newExpense.save();
    const bankAccount = await BankAccount.findById(savedExpense.bankAccountId);
    if (bankAccount) {
      let currentBalance = bankAccount.balance;
      let updateAmount = parseFloat(-savedExpense.amount);
      let updatedBalance = (currentBalance + updateAmount).toFixed(2);

      const updatedAccountBalance = await BankAccount.findByIdAndUpdate(
        savedExpense.bankAccountId,
        { balance: updatedBalance },
        { new: true }
      );

      if (updatedAccountBalance)
        res.status(201).json({
          success: true,
          message: "Expense added Successfully.",
        });
      else
        res.status(204).json({
          success: false,
          message: "Could n't update balance in the Account",
        });
    } else {
      res.status(204).json({
        success: false,
        message: "Could n't find the bankaccount",
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().populate("category"); // Populate category details
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getExpenseById = async (req, res) => {
  try {
    const expenseId = req.params.id;
    const expense = await Expense.findById(expenseId).populate("category");
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;
    const updateData = req.body;

    const updatedExpense = await Expense.findByIdAndUpdate(
      expenseId,
      updateData,
      { new: true }
    ); // Return updated document
    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json(updatedExpense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAllExpense = async (req, res) => {
  try {
    const expensesWithoutCategoryName = await Expense.find({
      categoryName: { $exists: false },
    });

    for (const expense of expensesWithoutCategoryName) {
      const category = await Category.findOne({
        _id: expense.category,
      });

      if (category) {
        await Expense.updateOne(
          { _id: expense._id },
          { $set: { categoryName: category.name } }
        );
      }
    }

    console.log("Expenses updated successfully!");
    return res.status(200).json({ message: "Expense Updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
