const router = require('express').Router();

const SalesReportController = require('../controllers/SalesReportController');

router.post('/', SalesReportController.create);
router.get('/', SalesReportController.read);
router.patch('/:id', SalesReportController.update);
router.delete('/:id', SalesReportController.delete);

module.exports = router;
