const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
        unique: true // falls erforderlich
    },
    Passwort: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Mitarbeiter',
    timestamps: false
});

// Beispiel für Passwort-Hashing vor dem Speichern in die Datenbank
Mitarbeiter.beforeCreate(async (mitarbeiter, options) => {
    if (mitarbeiter.Passwort) {
        const hashedPassword = await bcrypt.hash(mitarbeiter.Passwort, 10);
        mitarbeiter.Passwort = hashedPassword;
    }
});

// Beispiel für Methode zur Überprüfung des Passworts
Mitarbeiter.prototype.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.Passwort);
};

// Beispiel für Generierung eines JWT-Tokens
Mitarbeiter.prototype.generateAuthToken = function() {
    const token = jwt.sign({ id: this.MitarbeiterID, role: this.Rolle }, process.env.JWT_SECRET || 'defaultsecret', { expiresIn: 3600 });
    return token;
};

module.exports = Mitarbeiter;
