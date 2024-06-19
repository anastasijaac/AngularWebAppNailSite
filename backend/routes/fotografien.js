const express = require('express');
const router = express.Router();
const fotografienController = require('../controllers/fotografien.controller');

router.get('/', fotografienController.getAllFotografien);
router.post('/', fotografienController.createFotografie);

module.exports = router;
