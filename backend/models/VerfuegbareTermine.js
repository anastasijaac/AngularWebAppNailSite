const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Terminzeiten = require('./Terminzeiten');
const Mitarbeiter = require('./Mitarbeiter');

const VerfuegbareTermine = sequelize.define('VerfuegbareTermine', {
    VerfuegbareTerminID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Datum: {
        type: DataTypes.DATEONLY, // Nur Datum ohne Zeit
        allowNull: false
    },
    TerminzeitID: {
        type: DataTypes.INTEGER,
        references: {
            model: Terminzeiten,
            key: 'TerminzeitID'
        }
    },
    MitarbeiterID: {
        type: DataTypes.INTEGER,
        references: {
            model: Mitarbeiter,
            key: 'MitarbeiterID'
        }
    },
    Verfuegbar: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    tableName: 'VerfuegbareTermine',
    timestamps: false
});

// Assoziationen definieren
VerfuegbareTermine.belongsTo(Mitarbeiter, { foreignKey: 'MitarbeiterID' });
VerfuegbareTermine.belongsTo(Terminzeiten, { foreignKey: 'TerminzeitID' });

module.exports = VerfuegbareTermine;
