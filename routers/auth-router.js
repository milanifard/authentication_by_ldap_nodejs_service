const express = require('express');

const authController = require('../controllers/auth-controller');

const router = express.Router();



router.post('/gettoken', authController.getToken);
router.post('/verifytoken', authController.validateToken);

module.exports = router;