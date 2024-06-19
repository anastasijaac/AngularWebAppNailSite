const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Login route
router.post('/login', authController);

module.exports = router;
