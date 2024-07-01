const VerfuegbareTermine = require('../models/VerfuegbareTermine');

// GET alle VerfuegbareTermine
exports.getAllVerfuegbareTermine = async (req, res) => {
    try {
        const verfuegbareTermine = await VerfuegbareTermine.findAll();
        res.json(verfuegbareTermine);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// POST neues VerfuegbareTermin erstellen
exports.createVerfuegbareTermin = async (req, res) => {
    const { Datum, TerminzeitID, MitarbeiterID, Verfuegbar } = req.body;
    try {
        const neuesVerfuegbareTermin = await VerfuegbareTermine.create({ Datum, TerminzeitID, MitarbeiterID, Verfuegbar });
        res.status(201).send(neuesVerfuegbareTermin);
    } catch (err) {
        res.status(500).send(err.message);
    }
};
