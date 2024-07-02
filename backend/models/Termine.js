// models/Termine.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Kunde = require('./Kunde');
const Mitarbeiter = require('./Mitarbeiter');
const Dienstleistungen = require('./Dienstleistungen');
const Terminzeiten = require('./Terminzeiten');

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
    TerminzeitID: {
        type: DataTypes.INTEGER,
        references: {
            model: Terminzeiten,
            key: 'TerminzeitID'
        }
    },
    KundenID: {
        type: DataTypes.INTEGER,
        references: {
            model: Kunde,
            key: 'KundenID'
        }
    },
    MitarbeiterID: {
        type: DataTypes.INTEGER,
        references: {
            model: Mitarbeiter,
            key: 'MitarbeiterID'
        }
    },
    DienstleistungsID: {
        type: DataTypes.INTEGER,
        references: {
            model: Dienstleistungen,
            key: 'DienstleistungsID'
        }
    }
}, {
    tableName: 'Termine',
    timestamps: false
});

// Assoziationen definieren
Termine.belongsTo(Kunde, { foreignKey: 'KundenID' });
Termine.belongsTo(Mitarbeiter, { foreignKey: 'MitarbeiterID' });
Termine.belongsTo(Dienstleistungen, { foreignKey: 'DienstleistungsID' });
Termine.belongsTo(Terminzeiten, { foreignKey: 'TerminzeitID' });

module.exports = Termine;
