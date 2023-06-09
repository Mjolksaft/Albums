const express = require("express")
const app = express()
const mongoose = require("mongoose")
const path = require('path')
const album = require('./models/albums')
const cors = require("cors")
require("dotenv").config()

const port = process.env.PORT

mongoose.connect(process.env.CONNECTION_URL)
.then(console.log("SUCCEFULLY CONNECTED TO DATABASE"))
.catch(err => console.log(err))

app.use(
    cors({origin: "http://localhost:5000"}),
    express.json(),
    express.static(path.join(__dirname, '.')), // This middleware serves files from the root directory with the correct MIME type, so any JavaScript files included in your HTML files should be served with the correct MIME type as well.
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
        console.log(error);
        res.status(500).send({ status: 'error', message: error });
    }
});

app.get('/api/albums/:id', async (req, res) => { //return a jspn object of the given album 
    try {
        const title = req.params.id
        await album.find({_id: title})
        .then(result => {
            if (result.length == 0) {
                res.status(404).send({status: 'error', message: "title not found"})
                return
            }
            res.json(result)
        })
    } catch (error) {
        res.status(404).send({ status: 'error', message: error });
    }
});

app.post('/api/albums', async (req,res) => { // create a album in the database if the album does not exist 
    try {
        var data = req.body;
        var compare = []
        await album.find({title: data.title})
        .then(result => {
            compare = result
        })
        if (compare.length != 0) {
            res.status(409).json({message: "entry already exists"})
            return
        }
        const newAlbum = new album({title: data.title, artist: data.artist, year: data.year})
        await newAlbum.save()
        res.status(201).json(newAlbum)
    } catch (error) {
        res.status(409).send({ status: 'error', message: error });
    }
})

app.put('/api/albums/:id', async (req,res) => { // if id is not found resnd 404
    try {
        var id = req.params.id
        const data = req.body;
        await album.findByIdAndUpdate(id, data)
        .then(result => {
            console.log('User updated successfully');
        })
        .catch((error) => {
            res.status(404).send({ status: 'error', message: error });
        });
    } catch (error) {
        
    }
})

app.delete('/api/albums/:id', async (req,res) => { //if id is not found send 404 
    try {
        const id = req.params.id
        await album.findByIdAndDelete(id)
    } catch (error) {
        res.status(404).send({ status: 'error', message: error });
    }
    
})

app.listen(port, () => {
    console.log("listening on port", port);
}) 