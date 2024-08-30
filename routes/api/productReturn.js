const router = require('express').Router();
const ProductReturnController = require('../../controllers/ProductReturnController');

router.get('/', ProductReturnController.getproductReturns);
router.get('/:id', ProductReturnController.getproductReturn);

module.exports = router;
