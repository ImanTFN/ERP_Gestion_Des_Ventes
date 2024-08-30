const router = require('express').Router();
const CustomerLedgerController = require('../../controllers/CustomerLedgerController');

router.get('/', CustomerLedgerController.getcustomerLedgers);
router.get('/:id', CustomerLedgerController.getcustomerLedger);

module.exports = router;