if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const db = require('./db');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();
const functions = require('./mainfunctions');
const session = require('express-session');

functions.deleteAllRoom();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {  
    if (session.user){
        res.sendFile(__dirname + '/public/lobby.html');
    }else{ 
        res.sendFile(__dirname + '/public/index.html');
    }
});

app.post('/login', async(req, res) => {
    state = await functions.login(req.body);
    if (state===true){
        session.user = req.body.username;
        res.redirect('/')
    }else{
        res.redirect('/?status=Hibás felhasználónév vagy jelszó');
    }
});

app.post('/register', async (req, res) => {
    res.redirect(await functions.register(req.body));
});

app.post('/logout', (req, res) => {
    session.user = null;
    res.redirect('/');
});

app.get('/quick-match', async(req, res) => {
    state = await functions.joinRandomRoom(req.body);
    if (state===true){
        res.redirect('/game');
    }else{
        res.redirect('/?status=Hiba történt');
    }
});

app.get('/game', async(req, res) => {
    if (session.user){
        res.sendFile(__dirname + '/public/main.html');
    }else{
        res.redirect('/');
    }
});

app.post('/join',async(req, res) => {
    if (session.user){
        if(functions.joinFixRoom(req.body)){
            res.redirect('/game');
        }
    }else{
        res.redirect('/');
    }
});

app.post('newLobby', async(req, res) => {
    if (session.user){
        if(functions.createRoom(req.body)){
            res.redirect('/game');
        }
    }else{
        res.redirect('/');
    }
});

    //\
   // \\
  //   \\
 //     \\
//  file \\

app.get('/css',(req, res) => {
    res.sendFile(__dirname + '/public/style/style.css');
});

app.get('/js',(req, res) => {
    res.sendFile(__dirname + '/public/main.js');
});

app.get('/soruce',(req, res) => {
    console.log(req.query.src);
    res.sendFile(__dirname + '/public/sources/'+req.query.src);
});


    //\
   // \\
  //   \\
 //     \\
//  API  \\

app.get('/getquestion', async (req, res) => {
    if (session.user){
        let question = await functions.selectRandomQuestion();
        res.json(question);
    }else{
        res.redirect('/');
    }
});

app.get('/stats', async (req, res) => {
    if (session.user){
        let stats= await functions.getStats();
        res.json(stats);
    }else{
        res.redirect('/');
    }
});

app.get('/roomList', async (req, res) => {
    if (session.user){
        let roomList = await functions.getRoomList();
        res.json(roomList);
    }else{
        res.redirect('/');
    }
});

// Indítás \\

app.listen(port, () => {
   console.log(`Backend server is running on port ${port}`);
});

