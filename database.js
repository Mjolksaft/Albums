const db = require("mongoose")
require("dotenv").config()

db.connect(process.env.CONNECTION_URL)
.then(() => {
    console.log("connected to database ");
})
.catch(err => {
    console.log(err);
})

const albums = db.model('albums',{
    title: String,
    artist: String,
    year: String

})

async function getAlbums()  {
    console.log(albums.find())
}

module.exports= {
    getAlbums,
}