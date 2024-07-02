const {body, validationResult} = require('express-validator');
const Dienstleistungen = require('../models/Dienstleistungen');

// GET alle Dienstleistungen
exports.getAllDienstleistungen = async (req, res) => {
    try {
        const dienstleistungen = await Dienstleistungen.findAll();
        res.json(dienstleistungen);
    } catch (err) {
        res.status(500).send(err.message);
    }
};
