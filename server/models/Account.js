const mongoose = require("mongoose");

const instance = new mongoose.Schema(
  {
    /*
      document ID is set by default via MongoDB - next line is deprecated
      _id: mongoose.Schema.Types.ObjectId,
    */

    username: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

instance.virtual("incomes", {
  ref: "Income",
  localField: "_id",
  foreignField: "user",
});

instance.virtual("bankaccounts", {
  ref: "BankAccount",
  localField: "_id",
  foreignField: "user",
});

instance.virtual("credits", {
  ref: "Credit",
  localField: "_id",
  foreignField: "user",
});

instance.virtual("savings", {
  ref: "Saving",
  localField: "_id",
  foreignField: "user",
});

instance.virtual("expenses", {
  ref: "Expense",
  localField: "_id",
  foreignField: "user",
});

instance.virtual("subs", {
  ref: "Subscription",
  localField: "_id",
  foreignField: "user",
});

instance.set("toJSON", { virtuals: true });
instance.set("toObject", { virtuals: true });

// NOTE! use a singular model name, mongoose automatically creates a collection like so:
// model: 'Account' === collection: 'accounts'
const modelName = "Account";

module.exports = mongoose.model(modelName, instance);
