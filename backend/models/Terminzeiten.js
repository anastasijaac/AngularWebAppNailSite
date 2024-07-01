const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Terminzeiten = sequelize.define('Terminzeiten', {
    TerminzeitID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Uhrzeit: {
        type: DataTypes.TIME,
        allowNull: false
    }
}, {
    tableName: 'Terminzeiten',
    timestamps: false
});

module.exports = Terminzeiten;
