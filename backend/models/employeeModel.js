const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  employeeID: {
    type: String,
    unique: true,
    required: true
  },
  position: {
    type: Schema.Types.ObjectId,
    ref: 'Position',
    required: true
  },
  // any other fields you might need for an employee
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
