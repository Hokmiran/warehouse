const router = require('express').Router();
const DepartmentController = require('../../controllers/DepartmentController');

router.get('/', DepartmentController.getDepartments);
router.get('/:id', DepartmentController.getDepartment);

module.exports = router;
