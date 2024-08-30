const router = require('express').Router();
const InvoiceDetailController = require('../../controllers/InvoiceDetailController');

router.get('/', InvoiceDetailController.getinvoiceDetails);
router.get('/:id', InvoiceDetailController.getinvoiceDetails);

module.exports = router;