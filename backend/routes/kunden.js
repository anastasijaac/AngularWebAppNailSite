const express = require('express');
const router = express.Router();
const Kunde = require('../models/Kunde');

router.get('/', async (req, res) => {
    console.log('GET /api/kunden aufgerufen');
    try {
        const kunden = await Kunde.findAll();
        res.json(kunden);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Serverfehler');
    }
});

module.exports = router;
