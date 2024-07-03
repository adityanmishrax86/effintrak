const Income = require("../../models/Income");

exports.createIncome = async (req, res) => {
  try {
    const newIncome = new Income(req.body);
    const savedIncome = await newIncome.save();
    res.status(201).json({
      success: true,
      message: "Income added.",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getIncomes = async (req, res) => {
  try {
    const incomes = await Income.find().populate("category"); // Populate category details
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getIncomeById = async (req, res) => {
  try {
    const income = await Income.findById(req.params.id).populate("category");
    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }
    res.status(200).json(income);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateIncome = async (req, res) => {
  const allowedUpdates = ["description", "amount", "date", "source", "note"];
  const updates = Object.keys(req.body).filter((key) =>
    allowedUpdates.includes(key)
  );

  try {
    const income = await Income.findById(req.params.id);
    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }

    updates.forEach((update) => (income[update] = req.body[update]));
    await income.save();
    res.status(200).json(income);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteIncome = async (req, res) => {
  try {
    const income = await Income.findByIdAndDelete(req.params.id);
    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }
    res.status(200).json({ message: "Income deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
