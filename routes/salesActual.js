const router = require('express').Router();

const SalesActualController = require('../controllers/SalesActualController');

router.post('/', SalesActualController.create);
router.get('/', SalesActualController.read);
router.patch('/:id', SalesActualController.update);
router.delete('/:id', SalesActualController.delete);

module.exports = router;
