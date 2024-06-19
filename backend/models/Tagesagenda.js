const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Tagesagenda = sequelize.define('Tagesagenda', {
    TagesagendaID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Datum: {
        type: DataTypes.DATE,
        allowNull: false
    },
    MaxTermine: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'Tagesagenda',
    timestamps: false
});

module.exports = Tagesagenda;
