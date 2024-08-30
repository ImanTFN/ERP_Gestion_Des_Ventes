const router = require('express').Router();
const CustomerController = require('../../controllers/CustomerController');

router.get('/', CustomerController.getcustomers);
router.get('/:id', CustomerController.getcustomer);

module.exports = router;
