const express = require('express');
const router = express.Router();
const positionController = require('../controllers/positionController');
const protect = require("../middleWare/authMiddleware");

router.post('', protect, positionController.createPosition);
router.get('', protect, positionController.getAllPositions);
router.get('/:id', protect, positionController.getPositionById);
router.patch('/:id', protect, positionController.updatePosition);
router.delete('/:id', protect, positionController.deletePosition);

module.exports = router;