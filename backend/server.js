require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth'); // Importiere die auth-Routen

const app = express();

app.use(cors({
    origin: 'http://localhost:4700',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes); // Binde die auth-Routen ein

app.use((err, req, res, next) => {
    if (err) {
        res.status(500).json({ error: err.message });
    } else {
        next();
    }
});

app.use('/api/auth', authRoutes); // Binde die auth-Routen ein

sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Server running at http://localhost:3000');
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err.message);
});

module.exports = app;