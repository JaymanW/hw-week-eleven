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
    fs.readFile(path.join(__dirname, 'db/db.json'), 'utf8', (err, info) => {
        res.json(JSON.parse(info));
    });
});

app.post('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, 'db/db.json'), 'utf8', (err, info) => {
        const generateKey = () => {
            let key = [];
            for (let i = 0; i < 10; i++) {
                key.push(Math.floor(Math.random()*9+1));
            }
            const result = Number(key.join(''));
            return result;
        }

        const prevNotes = JSON.parse(info);
        
        // let note = req.body;
        console.log(req.body);
        // let uniqueKey = generateKey();
        // console.log(uniqueKey);
        // note.key = generateKey();

        // prevNotes.push(note);
        
        fs.writeFile(path.join(__dirname, 'db/db.json'), JSON.stringify(prevNotes), (err, info) => {
            // res.json(note);
        })
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});


// SERVER LISTEN
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});