const mongoose = require('mongoose');
const Customer = require('./Customer');

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Define a pre-save middleware function to convert 'name' to lowercase
departmentSchema.pre('save', function (next) {
// Ensure 'name' is always stored in lowercase
  this.name = this.name.toLowerCase();
  next();
});

// Define a pre 'remove' hook on the Parent model
departmentSchema.pre('remove', function (next) {
// Remove all child documents with a matching parent_id
  Customer.deleteMany({ department: this._id }, (err) => {
    if (err) {
      return next(err);
    }
    next();
  });
});
  
const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
