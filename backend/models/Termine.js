const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Termine = sequelize.define('Termine', {
    TerminID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Datum: {
        type: DataTypes.DATE,
        allowNull: false
    },
    Uhrzeit: {
        type: DataTypes.TIME,
        allowNull: false
    },
    KundenID: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Kunde',
            key: 'KundenID'
        }
    },
    MitarbeiterID: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Mitarbeiter',
            key: 'MitarbeiterID'
        }
    },
    DienstleistungsID: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Dienstleistungen',
            key: 'DienstleistungsID'
        }
    },
}, {
    tableName: 'Termine',
    timestamps: false
});

module.exports = Termine;
