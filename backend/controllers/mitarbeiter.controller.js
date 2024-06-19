const { body, validationResult } = require('express-validator');
const Mitarbeiter = require('../models/Mitarbeiter');

// GET alle Mitarbeiter
exports.getAllMitarbeiter = async (req, res) => {
    try {
        const mitarbeiter = await Mitarbeiter.findAll();
        res.json(mitarbeiter);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// POST neuen Mitarbeiter erstellen
exports.createMitarbeiter = [
    body('Name').isString().notEmpty(),
    body('Rolle').isString().notEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { Name, Rolle } = req.body;
        try {
            const neuerMitarbeiter = await Mitarbeiter.create({ Name, Rolle });
            res.status(201).send(neuerMitarbeiter);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
];
