const router = require('express').Router();
const UserController = require('../../controllers/UserController');

router.get('/', UserController.getusers);
router.get('/:id', UserController.getuser);

module.exports = router;
