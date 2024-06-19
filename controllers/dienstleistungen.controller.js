const { body, validationResult } = require('express-validator');
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

// POST neue Dienstleistung erstellen
exports.createDienstleistung = [
    body('Bezeichnung').isString().notEmpty(),
    body('Dauer').isInt({ min: 1 }),
    body('Preis').isFloat({ min: 0 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { Bezeichnung, Dauer, Preis } = req.body;
        try {
            const neueDienstleistung = await Dienstleistungen.create({ Bezeichnung, Dauer, Preis });
            res.status(201).send(neueDienstleistung);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
];
