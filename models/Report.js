const mongoose = require('mongoose');
const tz = require('mongoose-timezone');

const reportSchema = new mongoose.Schema({
  reporter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer"
  },
  product:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Product"
  },
  report: {
    type: String,
    required: true,
    min: 10,
  },
});

reportSchema.plugin(tz);
module.exports = mongoose.model('Report', reportSchema);
