const Terminzeiten = require('../models/Terminzeiten');

// GET alle Terminzeiten
exports.getAllTerminzeiten = async (req, res) => {
    try {
        const terminzeiten = await Terminzeiten.findAll();
        res.json(terminzeiten);
    } catch (err) {
        res.status(500).send(err.message);
    }
};
