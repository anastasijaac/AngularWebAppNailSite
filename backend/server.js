const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');

const app = express();
app.use(bodyParser.json());

const routes = require('./routes/index');

app.use('/api', routes);

// Middleware für Validierung
app.use((err, req, res, next) => {
    if (err) {
        res.status(500).json({ error: err.message });
    } else {
        next();
    }
});

sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Server running at http://localhost:3000');
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err.message);
});

module.exports = app;
