const express = require('express');
const cors = require('cors');
const app = express();

const path = require('path');

const PORT = 8080;

app.use(cors());
app.use(express.static('public/'));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// ROUTES
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
    // res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});