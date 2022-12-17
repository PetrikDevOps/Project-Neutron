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

app.post('/register', (req, res) => {
    console.log(req.body);
    functions.register(req.body);
    res.redirect('/?status=sikeres regisztráció');
});

app.post('/logout', (req, res) => {
    session.user = null;
    res.redirect('/');
});

app.get('/css',(req, res) => {
    res.sendFile(__dirname + '/public/style/style.css');
});


app.listen(port, () => {
   console.log(`Backend server is running on port ${port}`);
});

