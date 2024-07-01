const express = require('express');
const router = express.Router();
const verfuegbareTermineController = require('../controllers/verfuegbareTermine.controller');

router.get('/', verfuegbareTermineController.getAllVerfuegbareTermine);
router.post('/', verfuegbareTermineController.createVerfuegbareTermin);

module.exports = router;
