const sequelize = require('./config/database');
const Kunde = require('./models/Kunde');
const Mitarbeiter = require('./models/Mitarbeiter');
const Dienstleistungen = require('./models/Dienstleistungen');
const Feedback = require('./models/Feedback');
const Fotografien = require('./models/Fotografien');
const Tagesagenda = require('./models/Tagesagenda');
const Termine = require('./models/Termine');

sequelize.sync({ force: true })
    .then(() => {
        console.log('Database & tables created!');
    })
    .catch(err => {
        console.error('Unable to create database & tables:', err);
    });
