const router = require('express').Router();
const ReportController = require("../controllers/ReportController")

router.post('/', ReportController.create);
router.get('/:page', ReportController.read);
router.get('/', ReportController.read);
router.patch('/:id', ReportController.update);
router.delete('/:id', ReportController.delete);

module.exports = router;
