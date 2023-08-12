const asyncHandler = require("express-async-handler");
const Department = require('../models/departmentModel');

// Yeni departman oluşturma
const createDepartment = asyncHandler(async (req, res) => {
  try {
    const { name, createdBy } = req.body;
    const department = await Department.create({ name, createdBy });
    res.status(201).json(department);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Tüm departmanları listeleme
const getDepartment = asyncHandler(async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Belirli bir departmanı güncelleme
const updateDepartment = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const updatedDepartment = await Department.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    if (!updatedDepartment) {
      return res.status(404).json({ message: 'Departman bulunamadı' });
    }
    res.json(updatedDepartment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Belirli bir departmanı silme
const deleteDepartment = asyncHandler(async (req, res) => {
  try {
    const deletedDepartment = await Department.findByIdAndDelete(req.params.id);
    if (!deletedDepartment) {
      return res.status(404).json({ message: 'Departman bulunamadı' });
    }
    res.json({ message: 'Departman başarıyla silindi' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  createDepartment,
  getDepartment,
  updateDepartment,
  deleteDepartment
};
