const AuthController = require('../controllers/auth.controller');

const router = require('express').Router();

router.post('/login', AuthController.login);
router.get('/me', AuthController.profile);

module.exports = router;
