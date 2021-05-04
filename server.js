const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.static('public/'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

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
            const result = key.join('');
            return result;
        }

        const totalNotes = JSON.parse(info);
        // const note = req.body;
        let note = req.body;
        note.key = generateKey();

        totalNotes.push(note);
        console.log(totalNotes);
        
        fs.writeFile(path.join(__dirname, 'db/db.json'), JSON.stringify(totalNotes), (err, info) => {
            res.json(totalNotes);
        })
    });
});

app.delete("/api/notes/:key", (req, res) => {
    // console.log("WORKINGg")
    
    fs.readFile(path.join(__dirname, 'db/db.json'), 'utf8', (err, info) => {
        let totalNotes = JSON.parse(info);
        console.log(totalNotes);
        
        // const noteToDelete = totalNotes.find((note) => {
        //     return note.key === req.params.key;
        // });

        const findNoteToDelete = note => note.key === req.params.key;
        const noteToDeleteIndex = totalNotes.findIndex(findNoteToDelete);

        totalNotes.splice(noteToDeleteIndex, 1);

        console.log(totalNotes);

        // const noteSorter = (note) => note.id = req.params.key;
        // const totalNotes.findIndex(noteSorter);
        // console.log(totalNotes);
        // totalNotes.splice(noteToDelete);
        fs.writeFile(path.join(__dirname, 'db/db.json'), JSON.stringify(totalNotes), (err, data) => {
            res.send();
        })
    })
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});


// SERVER LISTEN
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});