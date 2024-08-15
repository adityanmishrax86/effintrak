const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  amount: {
    type: Number,
    required: true,
    min: 0.01,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  categoryName: {
    type: String,
    trim: true,
    required: true,
  },
  paymentMethod: {
    type: String,
    trim: true,
    maxlength: 50,
  },
  paidTo: {
    type: String,
    trim: true,
    maxlength: 100,
  },
  isRecurring: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Account",
  },
  //   // Optional attributes for future extension
  //   receipt: {
  //     // Reference to a file storage system or URL for receipt image
  //     type: String,
  //   },
  bankAccountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BankAccount",
  },
});

module.exports = mongoose.model("Expense", ExpenseSchema);
