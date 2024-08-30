const router = require('express').Router();

const ProductReturnController = require('../controllers/ProductReturnController');

router.post('/', ProductReturnController.create);
router.get('/', ProductReturnController.read);
router.patch('/:id', ProductReturnController.update);
router.delete('/:id', ProductReturnController.delete);

module.exports = router;
