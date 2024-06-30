require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const dienstleistungenRoutes = require('./routes/dienstleistungen');
const termineRoutes = require('./routes/termine');

const app = express();

app.use(cors({
    origin: 'http://localhost:4700',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes); // Binde die auth-Routen ein
app.use('/api/dienstleistungen', dienstleistungenRoutes); // Binde die dienstleistungen-Routen ein
app.use('/api/termine', termineRoutes);

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
