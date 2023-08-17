const express = require('express');
const router = express.Router();
const positionController = require('../controllers/positionController');

router.post('', positionController.createPosition);
router.get('', positionController.getAllPositions);
router.get('/:id', positionController.getPositionById);
router.put('/:id', positionController.updatePosition);
router.delete('/:id', positionController.deletePosition);

// Similar routes for Product, Employee, and ProductTransaction

module.exports = router;