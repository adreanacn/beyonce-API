/*/ const express = require("express");

const app = express();

const albumsData = [
    {
        albumId: "10",
        artistName: "Beyoncé",
        collectionName: "Lemonade",
        artworkUrl100:
            "http://is1.mzstatic.com/image/thumb/Music20/v4/23/c1/9e/23c19e53-783f-ae47-7212-03cc9998bd84/source/100x100bb.jpg",
        releaseDate: "2016-04-25T07:00:00Z",
        primaryGenreName: "Pop",
        url:
            "https://www.youtube.com/embed/PeonBmeFR8o?rel=0&amp;controls=0&amp;showinfo=0",
    },
    {
        albumId: "11",
        artistName: "Beyoncé",
        collectionName: "Dangerously In Love",
        artworkUrl100:
            "http://is1.mzstatic.com/image/thumb/Music/v4/18/93/6d/18936d85-8f6b-7597-87ef-62c4c5211298/source/100x100bb.jpg",
        releaseDate: "2003-06-24T07:00:00Z",
        primaryGenreName: "Pop",
        url:
            "https://www.youtube.com/embed/ViwtNLUqkMY?rel=0&amp;controls=0&amp;showinfo=0",
    },

    {
        albumId: "12",
        artistName: "Beyoncé",
        collectionName: "Live in Barcelona",
        artworkUrl100:
            "http://is1.mzstatic.com/image/thumb/Music/v4/18/93/6d/18936d85-8f6b-7597-87ef-62c4c5211298/source/100x100bb.jpg",
        releaseDate: "2003-06-24T07:00:00Z",
        primaryGenreName: "Pop",
        url:
            "https://www.youtube.com/embed/ViwtNLUqkMY?rel=0&amp;controls=0&amp;showinfo=0",
    },
];

app.get("/albums", function (req, res) {
    res.send(albumsData);
});

app.get("/albums/:albumId", function (req, res) {
    // req.params.albumId will match the value in the url after /albums/
    const albumId = req.params.albumId;
    const result = albumsData.filter(el => {
        return el.albumId === albumId
    });

    res.send(result)

    // now we can use the value for req.params.albumId to find the album requested
    // how do we "find" something in an array

    // finish the code yourself - it should end with res.send(album) where album is the single album you found  based on the id
});



app.listen(3000, () => {
    console.log(`Escuchando en el puerto`)
})
/*/

const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const albumsData = require("./albumsData.json");
const app = express();
app.use(bodyParser.json());
//GET albums
app.get("/albums", (req, res) => {
    res.send(albumsData);
});
//GET album by id
app.get("/albums/:albumId", (req, res) => {
    const albumId = req.params.albumId;
    const album = albumsData.filter((el) => el.albumId === albumId);
    res.json(album);
});
//POST album
app.post("/albums", (req, res) => {
    console.log("POST /albums route");
    const newAlbum = req.body;
    let maxId = Math.max(...albumsData.map((el) => Number(el.albumId))); //Math.max([10,11]);
    newAlbum.albumId = `${maxId + 1}`;
    let newAlbumsData = albumsData;
    newAlbumsData.push(newAlbum);
    fs.writeFileSync("./albumsData.json", JSON.stringify(newAlbumsData));
    res.send("POST album")
});
//DELETE album
app.delete("/albums/:albumID", (req, res) => {
    console.log("DELETE /albums route");
    const albumID = req.params.albumID;
    const album = albumsData.filter((el) => {
        el.albumId === albumID;
    });
    const index = albumsData.indexOf(album[0]);
    let newAlbumsData = albumsData;
    newAlbumsData.splice(index, 1);
    fs.writeFileSync("./albumsData.json", JSON.stringify(newAlbumsData));
    res.status(200).json({ succes: true });
});
app.listen(3000, () => {
    console.log("App is listening at port 3000");
});