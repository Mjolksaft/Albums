const express = require("express")
const app = express()
const mongoose = require("mongoose")
const path = require('path')
const album = require('./models/albums')
const mime = require('mime');
require("dotenv").config()

const port = process.env.PORT

mongoose.connect(process.env.CONNECTION_URL)
.then(console.log("SUCCEFULLY CONNECTED TO DATABASE"))
.catch(err => console.log(err))

app.use(
    express.json(),
    express.static(path.join(__dirname, '.')) // This middleware serves files from the root directory with the correct MIME type, so any JavaScript files included in your HTML files should be served with the correct MIME type as well.
) 

app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname,'./index.html'), )
});

app.get('/api/albums', async (req, res) => { // return ajson object with all albums
    try {
        await album.find()
        .then(result => {
            res.json(result)
        })
    } catch (error) {
        res.status(500)
    }
});

app.get('/api/albums/:title', async (req, res) => { //return a jspn object of the given album 
    try {
        const title =req.params.title
        await album.find({title: title})
        .then(result => {
            res.json(result)
        })
    } catch (error) {
        res.status(500)
    }
});

app.post('/api/albums', async (req,res) => { // create a album in the database if the album does not exist 
    try {
        var data = req.body;
        const newAlbum = new album({title: data.title, artist: data.artist, year: data.year})
        await newAlbum.save()
    } catch (error) {
        
    }
})

app.put('/api/albums/:id', async (req,res) => { // if id is not found resnd 404
    try {
        var id = req.params.id
        const data = req.body;
        await album.findByIdAndUpdate(id, data)
        .then(() => {
          console.log('User updated successfully');
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
        
    }
})

app.delete('/api/albums/:id', async (req,res) => { //if id is not found send 404 
    try {
        const id = req.params.id
        await album.findByIdAndDelete(id)
    } catch (error) {
        res.sendStatus(404)
    }
    
})

app.listen(port, () => {
console.log("listening on port", port);
}) 