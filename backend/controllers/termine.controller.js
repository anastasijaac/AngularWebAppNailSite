// controllers/termine.controller.js
const { body, validationResult } = require('express-validator');
const Termine = require('../models/Termine');
const Dienstleistungen = require('../models/Dienstleistungen');
const Mitarbeiter = require('../models/Mitarbeiter');
const VerfuegbareTermine = require('../models/VerfuegbareTermine');
const Terminzeiten = require('../models/Terminzeiten');
const { Op } = require('sequelize');

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
    body('TerminzeitID').isInt({ min: 1 }),
    body('KundenID').isInt({ min: 1 }),
    body('MitarbeiterID').isInt({ min: 1 }),
    body('DienstleistungsID').isInt({ min: 1 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { Datum, TerminzeitID, KundenID, MitarbeiterID, DienstleistungsID } = req.body;
        const dienstleistung = await Dienstleistungen.findByPk(DienstleistungsID);
        if (!dienstleistung) {
            return res.status(404).json({ msg: "Dienstleistung nicht gefunden" });
        }

        const conflicts = await Termine.findAll({
            where: {
                MitarbeiterID,
                Datum,
                TerminzeitID
            }
        });

        if (conflicts.length >= 3) {
            return res.status(409).json({ message: "Mitarbeiter hat bereits 3 Termine an diesem Tag" });
        }

        const neuerTermin = await Termine.create({
            Datum,
            TerminzeitID,
            KundenID,
            MitarbeiterID,
            DienstleistungsID
        });
        res.status(201).json(neuerTermin);
    }
];

// Verfügbare Mitarbeiter abrufen
exports.getAvailableEmployees = async (req, res) => {
    const { dienstleistungsID, datum } = req.query;

    try {
        const terminzeiten = await Terminzeiten.findAll();
        let availableEmployees = [];

        for (const terminzeit of terminzeiten) {
            const availableEmployeesAtTime = await VerfuegbareTermine.findAll({
                where: {
                    Datum: datum,
                    TerminzeitID: terminzeit.TerminzeitID,
                    Verfuegbar: true
                },
                include: [Mitarbeiter]
            });

            for (const record of availableEmployeesAtTime) {
                const termineCount = await Termine.count({
                    where: {
                        MitarbeiterID: record.MitarbeiterID,
                        Datum: datum,
                        TerminzeitID: terminzeit.TerminzeitID
                    }
                });

                if (termineCount < 3) {
                    availableEmployees.push({
                        MitarbeiterID: record.MitarbeiterID,
                        Name: record.Mitarbeiter.Name,
                        Terminzeit: terminzeit.Uhrzeit
                    });
                }
            }
        }

        res.json(availableEmployees);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Überprüfung der Terminverfügbarkeit
exports.checkTerminAvailability = async (req, res) => {
    const { Datum, TerminzeitID, MitarbeiterID } = req.body;

    const termineAmTag = await Termine.findAll({
        where: {
            MitarbeiterID,
            Datum,
            TerminzeitID
        }
    });

    if (termineAmTag.length > 0) {
        res.status(400).json({ message: 'Zeitfenster nicht verfügbar' });
    } else {
        res.status(200).json({ message: 'Termin verfügbar' });
    }
};

