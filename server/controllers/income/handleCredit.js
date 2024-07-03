const Credit = require("../../models/Credit");

exports.createCredit = async (req, res) => {
  try {
    const newCredit = new Credit(req.body);
    const savedCredit = await newCredit.save();
    res.status(201).json(savedCredit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCreditById = async (req, res) => {
  try {
    const creditId = req.params.id;
    const credit = await Credit.findById(creditId);
    if (!credit) {
      return res.status(404).json({ message: "Credit not found" });
    }
    res.status(200).json(credit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCredit = async (req, res) => {
  try {
    const creditId = req.params.id;
    const updateData = req.body;

    const updatedCredit = await Credit.findByIdAndUpdate(creditId, updateData, {
      new: true,
    }); // Return updated document
    if (!updatedCredit) {
      return res.status(404).json({ message: "Credit not found" });
    }
    res.status(200).json(updatedCredit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
