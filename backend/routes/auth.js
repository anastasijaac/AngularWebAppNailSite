const express = require('express');
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Kunde = require('../models/Kunde');
const Mitarbeiter = require('../models/Mitarbeiter');

const router = express.Router();

// Registration Route
router.post('/register', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({min: 6})
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {name, email, password} = req.body;

    try {
        let user = await Kunde.findOne({where: {Email: email}});

        if (user) {
            return res.status(400).json({msg: 'User already exists'});
        }

        user = new Kunde({
            Name: name,
            Email: email,
            Passwort: password
        });

        const salt = await bcrypt.genSalt(10);
        user.Passwort = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id,
                role: 'kunde'
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET || 'defaultsecret', {expiresIn: 3600}, (err, token) => {
            if (err) throw err;
            res.json({token, user: {...user.toJSON(), role: 'kunde'}});
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Login Route
router.post('/login', [
    check('email', 'Bitte geben Sie eine gültige E-Mail-Adresse ein').isEmail(),
    check('password', 'Bitte geben Sie das Passwort ein').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;

    try {
        let user = await Kunde.findOne({where: {Email: email}});

        if (!user) {
            user = await Mitarbeiter.findOne({where: {Email: email}});
            if (!user) {
                console.log('Benutzer nicht gefunden');
                return res.status(400).json({msg: 'Ungültige Anmeldedaten'});
            }

            const isMatch = await bcrypt.compare(password, user.Passwort);
            if (!isMatch) {
                return res.status(400).json({msg: 'Ungültige Anmeldedaten'});
            }

            const token = jwt.sign({
                id: user.id,
                role: 'mitarbeiter'
            }, process.env.JWT_SECRET || 'defaultsecret', {expiresIn: 3600});
            return res.json({token, user: {...user.toJSON(), role: 'mitarbeiter'}});
        }

        const isMatch = await bcrypt.compare(password, user.Passwort);
        if (!isMatch) {
            return res.status(400).json({msg: 'Ungültige Anmeldedaten'});
        }

        const token = jwt.sign({
            id: user.id,
            role: 'kunde'
        }, process.env.JWT_SECRET || 'defaultsecret', {expiresIn: 3600});
        return res.json({token, user: {...user.toJSON(), role: 'kunde'}});

    } catch (err) {
        console.error('Serverfehler:', err.message);
        res.status(500).send('Serverfehler');
    }
});

module.exports = router;
