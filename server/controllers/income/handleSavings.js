const Saving = require("../../models/Savings");

exports.createSaving = async (req, res) => {
  try {
    const newSaving = new Saving(req.body);
    const savedSaving = await newSaving.save();
    res.status(201).json(savedSaving);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getSavings = async (req, res) => {
  try {
    const savings = await Saving.find(); // Populate bank account details
    res.status(200).json(savings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSavingById = async (req, res) => {
  try {
    const savingId = req.params.id;
    const saving = await Saving.findById(savingId);
    if (!saving) {
      return res.status(404).json({ message: "Saving account not found" });
    }
    res.status(200).json(saving);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSaving = async (req, res) => {
  try {
    const savingId = req.params.id;
    const updateData = req.body;

    const updatedSaving = await Saving.findByIdAndUpdate(savingId, updateData, {
      new: true,
    }); // Return updated document
    if (!updatedSaving) {
      return res.status(404).json({ message: "Saving account not found" });
    }
    res.status(200).json(updatedSaving);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
