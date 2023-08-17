const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const positionSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
});

const Position = mongoose.model('Position', positionSchema);

module.exports = Position;
