// models/Kunde.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Kunde = sequelize.define('Kunde', {
    KundenID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    Passwort: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Kunde',
    timestamps: false
});

module.exports = Kunde;
