const { body, validationResult } = require('express-validator');

// Validierung für Kunde
exports.validateKunde = [
    body('Name').notEmpty().withMessage('Name ist erforderlich'),
    body('Email').isEmail().withMessage('Email ist ungültig'),
    body('Passwort').isLength({ min: 6 }).withMessage('Passwort muss mindestens 6 Zeichen lang sein'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Validierung für Mitarbeiter
exports.validateMitarbeiter = [
    body('Name').notEmpty().withMessage('Name ist erforderlich'),
    body('Rolle').notEmpty().withMessage('Rolle ist erforderlich'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Validierung für Dienstleistungen
exports.validateDienstleistung = [
    body('Bezeichnung').notEmpty().withMessage('Bezeichnung ist erforderlich'),
    body('Dauer').isInt({ min: 1 }).withMessage('Dauer muss eine positive Ganzzahl sein'),
    body('Preis').isFloat({ min: 0 }).withMessage('Preis muss eine positive Zahl sein'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Validierung für Feedback
exports.validateFeedback = [
    body('Text').notEmpty().withMessage('Text ist erforderlich'),
    body('Bewertung').isInt({ min: 1, max: 5 }).withMessage('Bewertung muss zwischen 1 und 5 liegen'),
    body('TerminID').isInt().withMessage('TerminID muss eine Ganzzahl sein'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Validierung für Fotografien
exports.validateFotografien = [
    body('DienstleistungsID').isInt().withMessage('DienstleistungsID muss eine Ganzzahl sein'),
    body('Bild').notEmpty().withMessage('Bild ist erforderlich'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Validierung für Tagesagenda
exports.validateTagesagenda = [
    body('Datum').notEmpty().withMessage('Datum ist erforderlich').isISO8601().toDate().withMessage('Datum muss im ISO8601-Format sein'),
    body('MaxTermine').isInt({ min: 1 }).withMessage('MaxTermine muss eine positive Ganzzahl sein'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Validierung für Termine
exports.validateTermine = [
    body('Datum').notEmpty().withMessage('Datum ist erforderlich').isISO8601().toDate().withMessage('Datum muss im ISO8601-Format sein'),
    body('Uhrzeit').notEmpty().withMessage('Uhrzeit ist erforderlich').matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('Uhrzeit muss im HH:MM-Format sein'),
    body('KundenID').isInt().withMessage('KundenID muss eine Ganzzahl sein'),
    body('MitarbeiterID').isInt().withMessage('MitarbeiterID muss eine Ganzzahl sein'),
    body('DienstleistungsID').isInt().withMessage('DienstleistungsID muss eine Ganzzahl sein'),
    body('TagesagendaID').isInt().withMessage('TagesagendaID muss eine Ganzzahl sein'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
