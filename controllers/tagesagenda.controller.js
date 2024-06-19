const { body, validationResult } = require('express-validator');
const Tagesagenda = require('../models/Tagesagenda');

// GET alle Tagesagenda
exports.getAllTagesagenda = async (req, res) => {
    try {
        const tagesagenda = await Tagesagenda.findAll();
        res.json(tagesagenda);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// POST neue Tagesagenda erstellen
exports.createTagesagenda = [
    body('Datum').isISO8601().toDate(),
    body('MaxTermine').isInt({ min: 1 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { Datum, MaxTermine } = req.body;
        try {
            const neueTagesagenda = await Tagesagenda.create({ Datum, MaxTermine });
            res.status(201).send(neueTagesagenda);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
];
