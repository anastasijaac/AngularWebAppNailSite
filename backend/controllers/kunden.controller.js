const Kunde = require('../models/Kunde');

exports.getAllKunden = async (req, res) => {
    try {
        const kunden = await Kunde.findAll();
        res.status(200).json(kunden);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

exports.createKunde = async (req, res) => {
    try {
        const {Name, Email, Passwort} = req.body;
        const neuerKunde = await Kunde.create({Name, Email, Passwort});
        res.status(201).json(neuerKunde);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};
