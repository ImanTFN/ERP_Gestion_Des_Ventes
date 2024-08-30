const router = require('express').Router();
const SalesReportController = require('../../controllers/SalesReportController');

router.get('/', SalesReportController.getsalesReports);
router.get('/:id', SalesReportController.getsalesReport);

module.exports = router;
