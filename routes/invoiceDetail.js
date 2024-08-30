const router = require('express').Router();

const InvoiceDetailController = require('../controllers/InvoiceDetailController');

router.post('/', InvoiceDetailController.create);
router.get('/', InvoiceDetailController.read);
router.patch('/:id', InvoiceDetailController.update);
router.delete('/:id', InvoiceDetailController.delete);

module.exports = router;