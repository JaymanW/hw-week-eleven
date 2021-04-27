const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();

const PORT = 8080;

app.use(cors());
app.use(express.static('public/'));

// ROUTES
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, 'db/db.json'), 'utf8', (err, data) => {
        res.json(JSON.parse(data));
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});


// SERVER LISTEN
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});