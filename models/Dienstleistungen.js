const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Dienstleistungen = sequelize.define('Dienstleistungen', {
    DienstleistungsID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Bezeichnung: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Dauer: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Preis: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    tableName: 'Dienstleistungen',
    timestamps: false
});

module.exports = Dienstleistungen;
