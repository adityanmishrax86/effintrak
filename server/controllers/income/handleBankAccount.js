const BankAccount = require("../../models/BankAccount");

exports.createBankAccount = async (req, res) => {
  try {
    const newBankAccount = new BankAccount(req.body);
    const savedBankAccount = await newBankAccount.save();
    res.status(201).json({
      success: true,
      balance: savedBankAccount.balance,
    });
  } catch (error) {
    if (error.message.includes("duplicate key error"))
      res.status(400).json({
        success: false,
        message:
          "Bank with Same name is existing already. Please change the Bank Name.",
      });
    else res.status(400).json({ error: error.message });
  }
};

exports.getAllAccounts = async (req, res) => {
  try {
    const userId = req.params.id;
    const accounts = await BankAccount.find({ user: userId }).select(
      "_id name"
    );
    res.status(200).json({
      success: true,
      accounts,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateBalance = async (req, res) => {
  try {
    const accountId = req.params.id;
    const updateData = req.body;

    if (!updateData.hasOwnProperty("balance")) {
      return res
        .status(400)
        .json({ message: "Missing required field: balance" });
    }

    const user = await BankAccount.findOne({ user: updateData["user"] });
    if (user) {
      let currentBalance = user.balance;
      let updateAmount = parseFloat(updateData.balance);
      updateData.balance = (currentBalance + updateAmount).toFixed(2);
      const bankAccount = await BankAccount.findByIdAndUpdate(
        accountId,
        updateData,
        { new: true }
      ); // Return updated document
      if (!bankAccount) {
        return res.status(404).json({ message: "Bank account not found" });
      }
      res.status(200).json({
        success: true,
        message: "Balance updated successfully",
        balance: bankAccount.balance,
      });
    } else {
      res.status(403).json({
        success: false,
        message: "Unable to find the User",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBalance = async (req, res) => {
  try {
    const userId = req.params.id; // Assuming ID based routing for bank accounts
    const bankAccount = await BankAccount.find({ user: userId });
    if (!bankAccount) {
      return res.status(404).json({ message: "Bank account not found" });
    }
    res.status(200).json({ balance: bankAccount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
