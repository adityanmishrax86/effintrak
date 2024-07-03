const mongoose = require("mongoose");

const BankAccountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  balance: {
    type: Number,
    default: 0.0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Account",
  },
  // Optional attributes for future extension
});

module.exports = mongoose.model("BankAccount", BankAccountSchema);
