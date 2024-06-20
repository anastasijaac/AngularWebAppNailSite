const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('naildata', 'nailmember', 'webangular123!', {
    host: 'naildata.database.windows.net',
    dialect: 'mssql',
    dialectOptions: {
        options: {
            encrypt: true,
            enableArithAbort: true,
        }
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: console.log // Protokollierung aktivieren
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

module.exports = sequelize;
