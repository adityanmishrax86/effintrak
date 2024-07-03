const mongoose = require("mongoose");

const IncomeSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  source: {
    type: String,
    trim: true,
    maxlength: 50,
  },
  note: {
    type: String,
    trim: true,
    maxlength: 250,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Account",
  },
});

module.exports = mongoose.model("Income", IncomeSchema);
