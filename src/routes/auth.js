const authController = require('../controllers/auth.controller');

const router = require('express').Router();

router.post('/login', authController.login);
router.get('/me', authController.profile);

module.exports = router;
