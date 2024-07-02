const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Mitarbeiter = require('../models/Mitarbeiter');

module.exports.employeeLogin = [
    check('email', 'Bitte geben Sie eine gültige E-Mail-Adresse ein').isEmail(),
    check('password', 'Bitte geben Sie das Passwort ein').exists(),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {email, password} = req.body;

        try {
            const mitarbeiter = await Mitarbeiter.findOne({where: {Email: email}});
            if (!mitarbeiter) {
                console.log('Mitarbeiter nicht gefunden');
                return res.status(400).json({msg: 'Ungültige Anmeldedaten'});
            }

            const isMatch = await bcrypt.compare(password, mitarbeiter.Passwort);
            if (!isMatch) {
                console.log('Passwort stimmt nicht überein');
                return res.status(400).json({msg: 'Ungültige Anmeldedaten'});
            }

            const token = jwt.sign({
                id: mitarbeiter.MitarbeiterID,
                role: 'mitarbeiter'
            }, process.env.JWT_SECRET, {expiresIn: 3600});
            res.json({token, mitarbeiter});

            console.log('Mitarbeiter erfolgreich eingeloggt - Token:', token);

        } catch (err) {
            console.error('Serverfehler:', err.message);
            res.status(500).send('Serverfehler');
        }
    }
];

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
exports.createMitarbeiter = async (req, res) => {
    try {
        const {Name, Rolle, Email, Passwort} = req.body;
        const neuerMitarbeiter = await Mitarbeiter.create({Name, Rolle, Email, Passwort});
        res.status(201).json(neuerMitarbeiter);
    } catch (err) {
        res.status(500).send(err.message);
    }
};
