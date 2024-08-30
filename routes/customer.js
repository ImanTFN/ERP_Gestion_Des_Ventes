const router = require('express').Router();

const CustomerController = require('../controllers/CustomerController');

router.post('/', CustomerController.create);
router.get('/', CustomerController.read);
router.patch('/:id', CustomerController.update);
router.delete('/:id', CustomerController.delete);

module.exports = router;
