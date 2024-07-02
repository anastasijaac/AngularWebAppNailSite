const sequelize = require('./config/database');

sequelize.sync({force: true})
    .then(() => {
        console.log('Database & tables created!');
    })
    .catch(err => {
        console.error('Unable to create database & tables:', err);
    });
