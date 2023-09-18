const router = require('express').Router();
const AuthController = require('../controllers/AuthController');

router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);
router.post('/forgot-password', AuthController.requestPasswordReset);
router.get('/reset-password/:token', AuthController.resetPasswordPage);
router.post('/reset-password/:token', AuthController.resetPassword);
router.get('/', AuthController.read);

module.exports = router;
