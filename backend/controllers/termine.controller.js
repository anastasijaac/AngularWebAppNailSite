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
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { Datum, Uhrzeit, KundenID, MitarbeiterID, DienstleistungsID } = req.body;
        try {
            const neuerTermin = await Termine.create({ Datum, Uhrzeit, KundenID, MitarbeiterID, DienstleistungsID});
            res.status(201).send(neuerTermin);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
];

exports.getAvailableTimes = async (req, res) => {
    const { serviceId, date } = req.query;
    try {
        // Hier musst du die Verfügbarkeit basierend auf Mitarbeiter, Dienstleistung und Datum prüfen.
        const availableTimes = await findAvailableTimes(serviceId, date);
        res.json(availableTimes);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

async function findAvailableTimes(serviceId, date) {
    // Beispiel: Finde alle Mitarbeiter, die für eine bestimmte Dienstleistung verfügbar sind.
    const employees = await Mitarbeiter.findAll({
        include: [{
            model: Dienstleistungen,
            where: { DienstleistungsID: serviceId }
        }]
    });

    // Prüfe für jeden Mitarbeiter, welche Zeiten am gegebenen Datum frei sind.
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

    return availableTimes;
}

