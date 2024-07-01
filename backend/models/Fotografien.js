const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Dienstleistungen = require('./Dienstleistungen');

const Fotografien = sequelize.define('Fotografien', {
    FotoID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    DienstleistungsID: {
        type: DataTypes.INTEGER,
        references: {
            model: Dienstleistungen,
            key: 'DienstleistungsID'
        }
    },
    Bildpfad: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Fotografien',
    timestamps: false
});

module.exports = Fotografien;
