const express = require('express');
const router = express.Router();

const dienstleistungenRoutes = require('./dienstleistungen');
const feedbackRoutes = require('./feedback');
const fotografienRoutes = require('./fotografien');
const mitarbeiterRoutes = require('./mitarbeiter');
const termineRoutes = require('./termine');
const terminzeitenRoutes = require('./terminzeiten');
const verfuegbareTermineRoutes = require('./verfuegbareTermine');

router.use('/dienstleistungen', dienstleistungenRoutes);
router.use('/feedback', feedbackRoutes);
router.use('/fotografien', fotografienRoutes);
router.use('/mitarbeiter', mitarbeiterRoutes);
router.use('/termine', termineRoutes);
router.use('/terminzeiten', terminzeitenRoutes);
router.use('/verfuegbareTermine', verfuegbareTermineRoutes);

module.exports = router;