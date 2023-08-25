const Position = require('../models/positionModel');

exports.createPosition = async (req, res) => {
  try {
    const position = new Position(req.body);
    await position.save();
    res.status(201).send(position);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getAllPositions = async (req, res) => {
  // const page = parseInt(req.query.page) || 0;
  // const productsPerPage = 10;
  try {
    const positions = await Position.find()
      // .sort("-createdAt")
      // .skip(page * productsPerPage)
      // .limit(productsPerPage);
    res.send(positions);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getPositionById = async (req, res) => {
  try {
    const position = await Position.findById(req.params.id);
    if (!position) return res.status(404).send();
    res.send(position);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updatePosition = async (req, res) => {
  try {
    const position = await Position.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!position) return res.status(404).send();
    res.send(position);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deletePosition = async (req, res) => {
  try {
    const position = await Position.findByIdAndDelete(req.params.id);
    if (!position) return res.status(404).send();
    res.send(position);
  } catch (error) {
    res.status(500).send(error);
  }
};