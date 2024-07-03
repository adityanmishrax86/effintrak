const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  description: {
    type: String,
    trim: true,
    maxlength: 250,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  billingCycle: {
    type: String,
    enum: ["Monthly", "Quarterly", "Yearly"],
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  endDate: {
    type: Date,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Account",
  },
  //   // Optional attributes for future extension
  //   customerId: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Customer", // Reference to a Customer model (if applicable)
  //   },
  //   productIds: [
  //     {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "Product", // Reference to associated Product(s) (if applicable)
  //     },
  //   ],
});

module.exports = mongoose.model("Subscription", SubscriptionSchema);
