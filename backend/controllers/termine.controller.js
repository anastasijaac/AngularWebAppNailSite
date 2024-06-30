const { body, validationResult } = require('express-validator');
const Termine = require('../models/Termine');
const Dienstleistungen = require('../models/Dienstleistungen');
const { Op, Sequelize } = require('sequelize');

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
    body('Uhrzeit').matches(/^\d{2}:\d{2}$/).withMessage('Uhrzeit must be in HH:MM format'),
    body('KundenID').isInt({ min: 1 }),
    body('MitarbeiterID').isInt({ min: 1 }),
    body('DienstleistungsID').isInt({ min: 1 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { Datum, Uhrzeit, KundenID, MitarbeiterID, DienstleistungsID } = req.body;
        const dienstleistung = await Dienstleistungen.findByPk(DienstleistungsID);
        if (!dienstleistung) {
            return res.status(404).json({ msg: "Dienstleistung nicht gefunden" });
        }

        const dauer = dienstleistung.Dauer * 60000; // Dauer in Millisekunden
        const startZeit = new Date(`${Datum.toISOString().split('T')[0]}T${Uhrzeit}:00.000Z`);
        const endZeit = new Date(startZeit.getTime() + dauer);

        const conflicts = await Termine.findAll({
            where: {
                MitarbeiterID,
                Datum,
                Uhrzeit: {
                    [Op.or]: [
                        { [Op.gte]: startZeit.toISOString().split('T')[1].substring(0, 8), [Op.lt]: endZeit.toISOString().split('T')[1].substring(0, 8) }
                    ]
                }
            }
        });

        if (conflicts.length > 0) {
            return res.status(409).json({ message: "Terminüberschneidung vorhanden" });
        }

        const neuerTermin = await Termine.create({
            Datum: Datum.toISOString().split('T')[0],
            Uhrzeit,
            KundenID,
            MitarbeiterID,
            DienstleistungsID
        });
        res.status(201).json(neuerTermin);
    }
];


// Überprüfung der Terminverfügbarkeit
exports.checkTerminAvailability = async (req, res) => {
    const { Datum, Uhrzeit, Dauer, MitarbeiterID } = req.body;
    const startZeit = new Date(`${Datum.toISOString().split('T')[0]}T${Uhrzeit}:00.000Z`);
    const endZeit = new Date(startZeit.getTime() + Dauer * 60000);

    const termineAmTag = await Termine.findAll({
        where: {
            MitarbeiterID,
            Datum: Datum.toISOString().split('T')[0],
            Uhrzeit: {
                [Op.or]: [
                    { [Op.lt]: endZeit.toISOString().split('T')[1].substring(0, 8) },
                    { [Op.gt]: startZeit.toISOString().split('T')[1].substring(0, 8) }
                ]
            }
        }
    });

    if (termineAmTag.length > 0) {
        res.status(400).json({ message: 'Zeitfenster nicht verfügbar' });
    } else {
        res.status(200).json({ message: 'Termin verfügbar' });
    }
};

// Verfügbare Zeiten abrufen
exports.getAvailableTimes = async (req, res) => {
    const { serviceId, date } = req.query;
    const employees = await Mitarbeiter.findAll({
        include: [{
            model: Dienstleistungen,
            where: { DienstleistungsID: serviceId }
        }]
    });

    const times = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];
    let availableTimes = [];

    for (const employee of employees) {
        const appointments = await Termine.findAll({
            where: {
                MitarbeiterID: employee.MitarbeiterID,
                Datum: date
            }
        });

        const bookedTimes = appointments.map(app => app.Uhrzeit);
        const freeTimes = times.filter(time => !bookedTimes.includes(time));

        if (freeTimes.length > 0) {
            availableTimes.push({
                MitarbeiterID: employee.MitarbeiterID,
                Name: employee.Name,
                AvailableTimes: freeTimes
            });
        }
    }

    res.json(availableTimes);
};
