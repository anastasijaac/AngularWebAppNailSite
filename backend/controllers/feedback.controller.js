const {body, validationResult} = require('express-validator');
const Feedback = require('../models/Feedback');

exports.getAllFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.findAll();
        res.json(feedbacks);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.createFeedback = [
    body('Text').isString().notEmpty(),
    body('Bewertung').isInt({min: 1, max: 5}),
    body('TerminID').isInt({min: 1}),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {Text, Bewertung, TerminID} = req.body;
        try {
            const neuesFeedback = await Feedback.create({Text, Bewertung, TerminID});
            res.status(201).send(neuesFeedback);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
];
