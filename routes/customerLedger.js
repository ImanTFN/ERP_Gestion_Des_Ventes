const router = require('express').Router();

const CustomerLedgerController = require('../controllers/CustomerLedgerController');

router.post('/', CustomerLedgerController.create);
router.get('/', CustomerLedgerController.read);
router.patch('/:id', CustomerLedgerController.update);
router.delete('/:id', CustomerLedgerController.delete);

module.exports = router;