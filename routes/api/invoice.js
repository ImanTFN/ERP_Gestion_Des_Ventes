const router = require('express').Router();
const InvoiceController = require('../../controllers/InvoiceController');

router.get('/', InvoiceController.getinvoices);
router.get('/:id', InvoiceController.getinvoice);

module.exports = router;
