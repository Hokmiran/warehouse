const asyncHandler = require("express-async-handler");
const Department = require('../models/departmentModel');
const mongoose = require("mongoose");

// Create Department
const createDepartment = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    const department = await Department.create({ name, createdBy: req.user.id });
    res.status(201).json(department);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get All Departments
const getDepartment = asyncHandler(async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Get single department
const getSingleDepartment = asyncHandler(async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);

    if (!department) {
      res.status(404);
      throw new Error("Department not found");
    }

    res.status(200).json(department);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      // Handle the case where the provided ID is not in a valid format
      res.status(404).json({ message: "Invalid department ID" });
    } else {
      // Handle other Mongoose-related errors
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

// Update Department
const updateDepartment = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const updatedDepartment = await Department.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    if (!updatedDepartment) {
      return res.status(404).json({ message: 'Cannot find department' });
    }
    res.json(updatedDepartment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Department
const deleteDepartment = asyncHandler(async (req, res) => {
  try {
    const deletedDepartment = await Department.findByIdAndDelete(req.params.id);
    if (!deletedDepartment) {
      return res.status(404).json({ message: 'Cannot find department' });
    }
    res.json({ message: 'Department has been deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  createDepartment,
  getDepartment,
  updateDepartment,
  deleteDepartment,
  getSingleDepartment
};
