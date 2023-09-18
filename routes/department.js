const router = require('express').Router();
const DepartmentController = require('../controllers/DepartmentController');

router.post('/', DepartmentController.create);
router.get('/:page', DepartmentController.read);
router.get('/', DepartmentController.read);
router.patch('/:id', DepartmentController.update);
router.delete('/:id', DepartmentController.delete);

module.exports = router;
