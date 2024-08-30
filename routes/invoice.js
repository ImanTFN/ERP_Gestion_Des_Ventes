const router = require('express').Router();

const InvoiceController = require('../controllers/InvoiceController');

router.post('/', InvoiceController.create);
router.get('/', InvoiceController.read);
router.patch('/:id', InvoiceController.update);
router.delete('/:id', InvoiceController.delete);

module.exports = router;
