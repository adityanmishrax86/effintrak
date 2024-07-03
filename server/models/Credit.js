const mongoose = require("mongoose");

const CreditSchema = new mongoose.Schema({
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
  dueDate: {
    type: Date,
    required: true,
  },
  creditor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BankAccount",
  },
  type: {
    type: String,
    enum: ["Loan", "Service Charge", "Credit Line"],
    required: true,
  },
  interestRate: {
    type: Number,
  },
  paymentMethod: {
    type: String,
    trim: true,
    maxlength: 50,
  },
  paid: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Account",
  },
});

module.exports = mongoose.model("Credit", CreditSchema);
