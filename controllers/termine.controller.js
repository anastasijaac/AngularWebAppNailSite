const { body, validationResult } = require('express-validator');
const Termine = require('../models/Termine');

// GET alle Termine
exports.getAllTermine = async (req, res) => {
    try {
        const termine = await Termine.findAll();
        res.json(termine);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// POST neuen Termin erstellen
exports.createTermin = [
    body('Datum').isISO8601().toDate(),
    body('Uhrzeit').isString().notEmpty(),
    body('KundenID').isInt({ min: 1 }),
    body('MitarbeiterID').isInt({ min: 1 }),
    body('DienstleistungsID').isInt({ min: 1 }),
    body('TagesagendaID').isInt({ min: 1 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { Datum, Uhrzeit, KundenID, MitarbeiterID, DienstleistungsID, TagesagendaID } = req.body;
        try {
            const neuerTermin = await Termine.create({ Datum, Uhrzeit, KundenID, MitarbeiterID, DienstleistungsID, TagesagendaID });
            res.status(201).send(neuerTermin);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
];
