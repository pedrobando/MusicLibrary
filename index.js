const express = require('express');
const musicContext = require('./repository/music-repository');
const app = express();
const { validateSong } = require('./middleware/music-validation');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.listen(3001, function(){
    console.log("Server started. Listening on port 3000.");
});

app.get('/api/music', (req, res) => {
    const music = musicContext.findAllSongs();
    return res.send(music);
})

app.get('/api/music/:id', (req, res) => {
    const id = req.params.id;
    const music = musicContext.findSongById(id);
    return res.send(music);
})

app.post('/api/music/', [validateSong], (req, res) => {
    const newSong = req.body;
    const addedMusic = musicContext.createSong(newSong);
    return res.send(addedMusic);
})

app.put('/api/music/:id', (req, res) => {
    const id = req.params.id;
    const toUpdate = req.body;
    const updatedMusic = musicContext.updateSong(toUpdate);
    return res.send(updatedMusic);
})

app.delete('/api/music/:id', (req, res) => {
    const id = req.params.id;
    const deletedMusic = musicContext.deleteSong(id);
    return res.send(deletedMusic);
})

