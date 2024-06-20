const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Kunde = require('../models/Kunde');

const router = express.Router();

router.post('/register', [
    check('name', 'Bitte geben Sie einen Namen ein').not().isEmpty(),
    check('email', 'Bitte geben Sie eine gültige E-Mail-Adresse ein').isEmail(),
    check('password', 'Bitte geben Sie ein Passwort mit mindestens 6 Zeichen ein').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        let kunde = await Kunde.findOne({ where: { Email: email } });
        if (kunde) {
            return res.status(400).json({ msg: 'Kunde existiert bereits' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        kunde = await Kunde.create({
            Name: name,
            Email: email,
            Passwort: hashedPassword
        });

        const token = jwt.sign({ id: kunde.KundenID }, process.env.JWT_SECRET || 'defaultsecret', { expiresIn: 3600 });

        res.json({ token, kunde });

    } catch (err) {
        console.error('Serverfehler:', err.message);
        res.status(500).send('Serverfehler');
    }
});

router.post('/login', [
    check('email', 'Bitte geben Sie eine gültige E-Mail-Adresse ein').isEmail(),
    check('password', 'Bitte geben Sie das Passwort ein').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const kunde = await Kunde.findOne({ where: { Email: email } });
        if (!kunde) {
            return res.status(400).json({ msg: 'Ungültige Anmeldedaten' });
        }

        const isMatch = await bcrypt.compare(password, kunde.Passwort);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Ungültige Anmeldedaten' });
        }

        const token = jwt.sign({ id: kunde.KundenID }, process.env.JWT_SECRET || 'defaultsecret', { expiresIn: 3600 });
        res.json({ token, kunde });

    } catch (err) {
        console.error('Serverfehler:', err.message);
        res.status(500).send('Serverfehler');
    }
});

module.exports = router;
