const mongoose = require("mongoose");

const SavingsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  description: {
    type: String,
    trim: true,
    maxlength: 250,
  },
  balance: {
    type: Number,
    required: true,
    default: 0.0,
  },
  targetAmount: {
    type: Number,
  },
  targetDate: {
    type: Date,
  },

  depositFrequency: {
    type: String,
    enum: ["Daily", "Weekly", "Monthly"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Account",
  },
});

module.exports = mongoose.model("Saving", SavingsSchema);
