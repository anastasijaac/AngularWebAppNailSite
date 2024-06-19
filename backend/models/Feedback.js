const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Feedback = sequelize.define('Feedback', {
    FeedbackID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Text: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Bewertung: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    TerminID: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Termine',
            key: 'TerminID'
        }
    }
}, {
    tableName: 'Feedback',
    timestamps: false
});

module.exports = Feedback;
