const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Mitarbeiter = sequelize.define('Mitarbeiter', {
    MitarbeiterID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Rolle: {
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
    tableName: 'Mitarbeiter',
    timestamps: false
});

module.exports = Mitarbeiter;
