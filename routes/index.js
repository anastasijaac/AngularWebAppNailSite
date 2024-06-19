const express = require('express');
const router = express.Router();

const dienstleistungenRoutes = require('./dienstleistungen');
const feedbackRoutes = require('./feedback');
const fotografienRoutes = require('./fotografien');
const mitarbeiterRoutes = require('./mitarbeiter');
const tagesagendaRoutes = require('./tagesagenda');
const termineRoutes = require('./termine');

router.use('/dienstleistungen', dienstleistungenRoutes);
router.use('/feedback', feedbackRoutes);
router.use('/fotografien', fotografienRoutes);
router.use('/mitarbeiter', mitarbeiterRoutes);
router.use('/tagesagenda', tagesagendaRoutes);
router.use('/termine', termineRoutes);

module.exports = router;
