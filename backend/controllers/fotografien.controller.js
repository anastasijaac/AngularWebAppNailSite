const {body, validationResult} = require('express-validator');
const Fotografien = require('../models/Fotografien');

// GET alle Fotografien
exports.getAllFotografien = async (req, res) => {
    try {
        const fotografien = await Fotografien.findAll();
        res.json(fotografien);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// POST neue Fotografie erstellen
exports.createFotografie = [
    body('DienstleistungsID').isInt({min: 1}),
    body('Bildpfad').isString().notEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {DienstleistungsID, Bildpfad} = req.body;
        try {
            const neueFotografie = await Fotografien.create({DienstleistungsID, Bildpfad});
            res.status(201).send(neueFotografie);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
];
