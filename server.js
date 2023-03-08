const express = require("express");
const fs = require("fs");
const note = require("./Develop/db/db.json")
const path = require("path");
const uuid = require("uuid");

const app = express();
const PORT = 3001;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//saves note and adds to db.json
app.get("/api/note", (req, res) => {
  res.sendFile(path.join(__dirname, "./Develop/db/db.json"))
});

// function to add new note
app.post("/api/note", (req,res) => {
    const note = JSON.parse(fs.readFileSync("./Develop/db/db.json"));
    const newEntry = req.body;
    newEntry.id = uuid.v4();
    note.push(newEntry);
    fs.writeFileSync("./Develop/db/db.json", JSON.stringify(note));
    res.json(note);
})

// calling note.html
app.get('/note', (req, res) => {
  res.sendFile(path.join(__dirname,'./Develop/public/note.html' ));
});

//calling index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});


app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});