const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Kunde = require('../models/Kunde');
const Mitarbeiter = require('../models/Mitarbeiter');

const router = express.Router();

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
        let user = await Kunde.findOne({ where: { Email: email } });

        if (!user) {
            user = await Mitarbeiter.findOne({ where: { Email: email } });
            if (!user) {
                console.log('Benutzer nicht gefunden');
                return res.status(400).json({ msg: 'Ungültige Anmeldedaten' });
            }
        }

        const isMatch = await bcrypt.compare(password, user.Passwort);
        if (!isMatch) {
            console.log('Passwort stimmt nicht überein');
            return res.status(400).json({ msg: 'Ungültige Anmeldedaten' });
        }

        const token = jwt.sign({ id: user.id, role: user instanceof Kunde ? 'kunde' : 'mitarbeiter' }, process.env.JWT_SECRET || 'defaultsecret', { expiresIn: 3600 });
        res.json({ token, user });

    } catch (err) {
        console.error('Serverfehler:', err.message);
        res.status(500).send('Serverfehler');
    }
});


module.exports = router;
