const express = require("express")
const app = express()
const db = require("./database")
const path = require('path')
require("dotenv").config()

const port = process.env.PORT

app.listen(port, () => {
console.log("listening on port", port);
}) 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});

app.get('/api/albums', async (req, res) => { // return ajson object with all albums
    await db.getAlbums()
    // res.json(db.getAlbums())
    // res.sendFile(path.join(__dirname, './index.html'));
});

app.get('/api/albums/:title', (req, res) => { //return a jspn object of the given album 
    const title = req.params.title;
    console.log(title);
});

app.post('/api/albums', (req,res) => { // create a album in the database if the album does not exist 

})

app.put('/api/albums/:id', (req,res) => { // if id is not found resnd 404

})

app.delete('/api/albums/:id', (req,res) => { //if id is not found send 404 

})