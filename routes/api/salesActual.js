const router = require('express').Router();
const SalesActualController = require('../../controllers/SalesActualController');

router.get('/', SalesActualController.getsalesActuals);
router.get('/:id', SalesActualController.getsalesActual);

module.exports = router;
