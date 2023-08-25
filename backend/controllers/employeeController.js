const Employee = require('../models/employeeModel');
const mongoose = require("mongoose");

exports.createEmployee = async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).send(employee);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().populate('department position');
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).send();
    res.send(employee);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!employee) return res.status(404).send();
    res.send(employee);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).send();
    res.send(employee);
  } catch (error) {
    res.status(500).send(error);
  }
};