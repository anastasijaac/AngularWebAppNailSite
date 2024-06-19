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
    }
});

module.exports = sequelize;
