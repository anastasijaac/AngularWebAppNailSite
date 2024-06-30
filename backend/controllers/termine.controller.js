const { body, validationResult } = require('express-validator');
const Termine = require('../models/Termine');
const Dienstleistungen = require('../models/Dienstleistungen');
const { Op } = require('sequelize');
const Sequelize = require('sequelize');

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
        console.log('Datum:', Datum);
        console.log('Uhrzeit:', Uhrzeit);

        // Datum und Uhrzeit kombinieren
        const startZeitString = `${Datum.toISOString().split('T')[0]}T${Uhrzeit}:00.000Z`;
        const startZeit = new Date(startZeitString);
        console.log('startZeit:', startZeit);

        if (isNaN(startZeit.getTime())) {
            return res.status(400).json({ msg: 'Ungültige Zeitwerte für startZeit' });
        }

        const dienstleistung = await Dienstleistungen.findByPk(DienstleistungsID);
        if (!dienstleistung) {
            return res.status(404).json({ msg: "Dienstleistung nicht gefunden" });
        }

        const dauer = dienstleistung.Dauer;
        const endZeit = new Date(startZeit.getTime() + dauer * 60000);
        console.log('endZeit:', endZeit);

        if (isNaN(endZeit.getTime())) {
            return res.status(400).json({ msg: 'Ungültige Zeitwerte für endZeit' });
        }

        const endUhrzeit = endZeit.toISOString().split('T')[1].substring(0, 8);
        console.log('endUhrzeit:', endUhrzeit);

        // Überprüfen auf Terminkonflikte
        const conflicts = await Termine.findAll({
            where: {
                Datum: Datum.toISOString().split('T')[0],
                MitarbeiterID,
                [Op.or]: [
                    {
                        Uhrzeit: {
                            [Op.between]: [Uhrzeit, endUhrzeit]
                        }
                    },
                    {
                        Uhrzeit: {
                            [Op.lt]: Uhrzeit
                        },
                        [Op.and]: Sequelize.literal(`DATEADD(minute, ${dauer}, CAST(Uhrzeit AS datetime)) >= '${Uhrzeit}'`)
                    }
                ]
            }
        });

        console.log('conflicts:', conflicts);

        if (conflicts.length > 0) {
            return res.status(400).json({ msg: 'Zeitfenster nicht verfügbar' });
        }

        // Neuer Termin erstellen
        const neuerTermin = await Termine.create({
            Datum: Datum.toISOString().split('T')[0],
            Uhrzeit: Uhrzeit,  // Uhrzeit im richtigen Format speichern
            KundenID,
            MitarbeiterID,
            DienstleistungsID
        });
        res.status(201).json(neuerTermin);
    }
];

// Verfügbarkeit eines Termins überprüfen
exports.checkTerminAvailability = async (req, res) => {
    const { Datum, Uhrzeit, Dauer, MitarbeiterID } = req.body;
    console.log('Datum:', Datum);
    console.log('Uhrzeit:', Uhrzeit);

    const startZeitString = `${Datum.toISOString().split('T')[0]}T${Uhrzeit}:00.000Z`;
    const startZeit = new Date(startZeitString);
    console.log('startZeit:', startZeit);

    if (isNaN(startZeit.getTime())) {
        return res.status(400).json({ msg: 'Ungültige Zeitwerte für startZeit' });
    }

    const endZeit = new Date(startZeit.getTime() + Dauer * 60000);
    console.log('endZeit:', endZeit);

    if (isNaN(endZeit.getTime())) {
        return res.status(400).json({ msg: 'Ungültige Zeitwerte für endZeit' });
    }

    const endUhrzeit = endZeit.toISOString().split('T')[1].substring(0, 8);
    console.log('endUhrzeit:', endUhrzeit);

    try {
        const termineAmTag = await Termine.findAll({
            where: {
                Datum: Datum.toISOString().split('T')[0],
                MitarbeiterID,
                [Op.or]: [
                    { Uhrzeit: { [Op.gte]: Uhrzeit, [Op.lt]: endUhrzeit } },
                    {
                        Uhrzeit: { [Op.lt]: Uhrzeit },
                        [Op.and]: Sequelize.literal(`DATEADD(minute, ${Dauer}, CAST(Uhrzeit AS datetime)) >= '${Uhrzeit}'`)
                    }
                ]
            }
        });

        console.log('termineAmTag:', termineAmTag);

        if (termineAmTag.length > 0) {
            res.status(400).json({ message: 'Zeitfenster nicht verfügbar' });
        } else {
            res.status(200).json({ message: 'Termin verfügbar' });
        }
    } catch (error) {
        console.error('Fehler beim Überprüfen der Terminverfügbarkeit:', error);
        res.status(500).send(error.message);
    }
};

// Verfügbare Zeiten für eine Dienstleistung und ein Datum abrufen
exports.getAvailableTimes = async (req, res) => {
    const { serviceId, date } = req.query;

    try {
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
    } catch (err) {
        res.status(500).send(err.message);
    }
};
