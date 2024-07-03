const Subscription = require("../../models/Subscription");

// Create a new subscription
exports.createSubscription = async (req, res) => {
  try {
    const newSubscription = new Subscription(req.body);
    const savedSubscription = await newSubscription.save();
    res.status(201).json(savedSubscription);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all subscriptions
exports.getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find();
    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific subscription by ID
exports.getSubscriptionById = async (req, res) => {
  try {
    const subscriptionId = req.params.id;
    const subscription = await Subscription.findById(subscriptionId);
    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }
    res.status(200).json(subscription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a subscription
exports.updateSubscription = async (req, res) => {
  try {
    const subscriptionId = req.params.id;
    const updateData = req.body;

    const updatedSubscription = await Subscription.findByIdAndUpdate(
      subscriptionId,
      updateData,
      { new: true }
    ); // Return updated document
    if (!updatedSubscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }
    res.status(200).json(updatedSubscription);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a subscription
exports.deleteSubscription = async (req, res) => {
  try {
    const subscriptionId = req.params.id;
    const deletedSubscription = await Subscription.findByIdAndDelete(
      subscriptionId
    );
    if (!deletedSubscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }
    res.status(200).json({ message: "Subscription deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cancel a subscription (soft delete or set isActive to false) /:id/cancel
exports.cancelSubscription = async (req, res) => {
  try {
    const subscriptionId = req.params.id;
    const updatedSubscription = await Subscription.findByIdAndUpdate(
      subscriptionId,
      { isActive: false },
      { new: true }
    );
    if (!updatedSubscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }
    res.status(200).json({ message: "Subscription canceled successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Renew a subscription (update endDate or set a new billing cycle) /:id/renew
exports.renewSubscription = async (req, res) => {
  try {
    const subscriptionId = req.params.id;
    const updateData = req.body; // Should include fields for renewal logic (e.g., endDate, billingCycle)

    const updatedSubscription = await Subscription.findByIdAndUpdate(
      subscriptionId,
      updateData,
      { new: true }
    );
    if (!updatedSubscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }
    res.status(200).json({
      message: "Subscription renewed successfully",
      renewedSubscription: updatedSubscription,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
