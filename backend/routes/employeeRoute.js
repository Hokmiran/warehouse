const express = require('express');
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const employeeController = require('../controllers/employeeController');

// Employee routes
router.post('', protect, employeeController.createEmployee);
router.get('', protect, employeeController.getAllEmployees);
router.get('/:id', protect, employeeController.getEmployeeById);
router.patch('/:id', protect, employeeController.updateEmployee);
router.delete('/:id', protect, employeeController.deleteEmployee);


module.exports = router;