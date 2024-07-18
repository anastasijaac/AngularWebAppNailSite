// controllers/termine.controller.js
const {body, validationResult} = require('express-validator');
const Termine = require('../models/Termine');
const Dienstleistungen = require('../models/Dienstleistungen');
const Mitarbeiter = require('../models/Mitarbeiter');
const VerfuegbareTermine = require('../models/VerfuegbareTermine');
const Terminzeiten = require('../models/Terminzeiten');
const {Op} = require('sequelize');

// GET alle Termine
exports.getAllTermine = async (req, res) => {
    try {
        const termine = await Termine.findAll();
        res.json(termine);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// GET Termine für einen bestimmten Kunden
exports.getTermineByKundenID = async (req, res) => {
    const kundenID = req.params.kundenID;

    if (!kundenID) {
        return res.status(400).send('KundenID fehlt in der Anfrage.');
    }

    try {
        const termine = await Termine.findAll({
            where: {KundenID: kundenID},
            include: [
                {model: Dienstleistungen, attributes: ['Bezeichnung']},
                {model: Mitarbeiter, attributes: ['Name']},
                {model: Terminzeiten, attributes: ['Uhrzeit']}
            ]
        });

        const now = new Date();
        console.log('Aktuelle Zeit:', now);

        // Formatierung der Uhrzeiten für das Frontend und Filterung vergangener Termine
        const formattedTermine = termine.map(termin => {
            // Konvertiere die TerminzeitID zu den entsprechenden Uhrzeiten
            let formattedTime = '';
            switch (termin.TerminzeitID) {
                case 1:
                    formattedTime = '10:00';
                    break;
                case 2:
                    formattedTime = '13:00';
                    break;
                case 3:
                    formattedTime = '16:00';
                    break;
                default:
                    formattedTime = 'Unbekannt';
            }

            return {
                ...termin.toJSON(),
                Terminzeiten: {Uhrzeit: formattedTime}
            };
        });

        console.log('Formatierte Termine:', formattedTermine);
        res.json(formattedTermine);
    } catch (err) {
        res.status(500).send(err.message);
    }
};


// GET Termine für einen bestimmten Mitarbeiter
exports.getTermineByMitarbeiterID = async (req, res) => {
    const mitarbeiterID = req.params.mitarbeiterID;
    const datum = req.query.datum;

    console.log(`MitarbeiterID: ${mitarbeiterID}`);
    console.log(`Datum: ${datum}`);

    try {
        const termine = await Termine.findAll({
            where: {
                MitarbeiterID: mitarbeiterID,
                Datum: {
                    [Op.between]: [
                        new Date(datum + 'T00:00:00Z'),
                        new Date(datum + 'T23:59:59Z')
                    ]
                }
            },
            include: [
                {model: Dienstleistungen, attributes: ['Bezeichnung']},
                {model: Mitarbeiter, attributes: ['Name']},
                {model: Terminzeiten, attributes: ['Uhrzeit']}
            ]
        });

        console.log('Gefundene Termine:', termine);

        // Formatierung der Uhrzeiten für das Frontend
        const formattedTermine = termine.map(termin => {
            // Konvertiere die TerminzeitID zu den entsprechenden Uhrzeiten
            let formattedTime = '';
            switch (termin.TerminzeitID) {
                case 1:
                    formattedTime = '10:00';
                    break;
                case 2:
                    formattedTime = '13:00';
                    break;
                case 3:
                    formattedTime = '16:00';
                    break;
                default:
                    formattedTime = 'Unbekannt';
            }

            return {
                ...termin.toJSON(),
                Terminzeiten: {Uhrzeit: formattedTime}
            };
        });

        console.log('Formatierte Termine:', formattedTermine);
        res.json(formattedTermine);
    } catch (err) {
        res.status(500).send(err.message);
    }
};


// POST neuen Termin erstellen
exports.createTermin = [
    body('Datum').isISO8601().toDate(),
    body('TerminzeitID').isInt({min: 1}),
    body('KundenID').isInt({min: 1}),
    body('MitarbeiterID').isInt({min: 1}),
    body('DienstleistungsID').isInt({min: 1}),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {Datum, TerminzeitID, KundenID, MitarbeiterID, DienstleistungsID} = req.body;

        try {
            // Überprüfen, ob es einen Konflikt mit bestehenden Terminen gibt
            const existingTermin = await Termine.findOne({
                where: {
                    MitarbeiterID,
                    Datum,
                    TerminzeitID
                }
            });

            if (existingTermin) {
                return res.status(409).json({message: "Dieser Termin ist bereits gebucht"});
            }

            const neuerTermin = await Termine.create({
                Datum,
                TerminzeitID,
                KundenID,
                MitarbeiterID,
                DienstleistungsID
            });

            res.status(201).json(neuerTermin);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
];

// Verfügbare Mitarbeiter abrufen
exports.getAvailableEmployees = async (req, res) => {
    const { Datum, TerminzeitID } = req.query;

    try {
        // Konvertiere das Datum zu einem ISO-String ohne Zeit
        const dateOnly = new Date(Datum).toISOString().split('T')[0];

        // Debugging-Ausgabe
        console.log(`Datum: ${dateOnly}, TerminzeitID: ${TerminzeitID}`);

        // Abrufen der verfügbaren Mitarbeiter
        const availableEmployees = await VerfuegbareTermine.findAll({
            where: {
                Datum: dateOnly,
                TerminzeitID,
                Verfuegbar: true
            },
            include: [Mitarbeiter]
        });

        // Debugging-Ausgabe
        console.log('Available Employees:', availableEmployees);

        // Abrufen der belegten Mitarbeiter
        const occupiedEmployees = await Termine.findAll({
            where: {
                Datum: dateOnly,
                TerminzeitID
            },
            attributes: ['MitarbeiterID']
        });

        // Debugging-Ausgabe
        console.log('Occupied Employees:', occupiedEmployees);

        // Extrahieren der MitarbeiterIDs der belegten Mitarbeiter
        const occupiedEmployeeIDs = occupiedEmployees.map(termin => termin.MitarbeiterID);

        // Debugging-Ausgabe
        console.log('Occupied Employee IDs:', occupiedEmployeeIDs);

        // Herausfiltern der belegten Mitarbeiter
        const freeEmployees = availableEmployees.filter(employee => !occupiedEmployeeIDs.includes(employee.MitarbeiterID));

        // Debugging-Ausgabe
        console.log('Free Employees:', freeEmployees);

        res.json(freeEmployees);
    } catch (err) {
        res.status(500).send(err.message);
    }
};




// Überprüfung der Terminverfügbarkeit
exports.checkTerminAvailability = async (req, res) => {
    const {Datum, TerminzeitID, MitarbeiterID} = req.body;

    const termineAmTag = await Termine.findAll({
        where: {
            MitarbeiterID,
            Datum,
            TerminzeitID
        }
    });

    if (termineAmTag.length > 0) {
        res.status(400).json({message: 'Zeitfenster nicht verfügbar'});
    } else {
        res.status(200).json({message: 'Termin verfügbar'});
    }
};

