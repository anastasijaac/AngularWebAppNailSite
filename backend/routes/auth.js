const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Kunde = require('../models/Kunde'); // Pfad nach Bedarf anpassen
const { check, validationResult } = require('express-validator');

// Login Route
router.post('/login', [
    check('email', 'Bitte geben Sie eine gültige E-Mail-Adresse ein').isEmail(),
    check('password', 'Bitte geben Sie das Passwort ein').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Debugging-Logs hinzufügen
    console.log('Login Attempt - Email:', email); // Log die eingegebene E-Mail-Adresse
    console.log('Login Attempt - Password:', password); // Log das eingegebene Passwort

    try {
        const kunde = await Kunde.findOne({ where: { Email: email } });

        if (!kunde) {
            console.log('Nutzer nicht gefunden'); // Log wenn der Nutzer nicht gefunden wurde
            return res.status(400).json({ msg: 'Ungültige Anmeldedaten' });
        }

        const isMatch = await bcrypt.compare(password, kunde.Passwort);
        if (!isMatch) {
            console.log('Passwort stimmt nicht überein'); // Log wenn das Passwort nicht übereinstimmt
            return res.status(400).json({ msg: 'Ungültige Anmeldedaten' });
        }

        const token = jwt.sign({ id: kunde.KundenID }, process.env.JWT_SECRET, { expiresIn: 3600 });
        res.json({ token, kunde });

        console.log('Login erfolgreich - Token:', token); // Log wenn der Login erfolgreich ist

    } catch (err) {
        console.error('Serverfehler:', err.message); // Log bei einem Serverfehler
        res.status(500).send('Serverfehler');
    }
});

module.exports = router;
