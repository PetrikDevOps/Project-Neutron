const db = require('./db');
const express = require('express');
const app = express();
const router = express.Router();
const functions = require('./mainfunctions');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const { json } = require('express');
const expressWs = require('express-ws')(app);

session.usernames= [];
session.userIds = [];
functions.deleteAllRoom();


app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {  
    if (session.usernames.includes(req.cookies.username)){
        res.sendFile(__dirname + '/public/lobby.html');
    }else{ 
        res.sendFile(__dirname + '/public/index.html');
    }
});

app.post('/login', async(req, res) => {
    state = await functions.login(req.body);
    if (state===true){
        //add the name to the session.usnernames array
        session.usernames.push(req.body.username);
        res.cookie('username', req.body.username);
        //find the id of the user in session.userIds
        let id = session.userIds.find(x => x.name === req.body.username).id;
        res.cookie('id', id);
        res.redirect('/')
    }else{
        res.redirect('/?status=Hibás felhasználónév vagy jelszó');
    }
});

app.post('/register', async (req, res) => {
    res.redirect(await functions.register(req.body));
});

app.post('/logout', (req, res) => {
    elemetToDel = session.usernames.indexOf(req.cookies.username);
    session.usernames.splice(elemetToDel,1);
    res.clearCookie('username');
    res.redirect('/');
});

app.get('/quick-match', async(req, res) => {
    if (session.usernames.includes(req.cookies.username)){   
        state = await functions.joinRandomRoom(req);
        if (state===true){
            res.redirect('/game');
        }else{
            res.redirect('/?status=Hiba történt');
        }
    }else{
        res.redirect('/');
    }
});

app.get('/game', async(req, res) => {
    if (session.usernames.includes(req.cookies.username)){
        res.sendFile(__dirname + '/public/main.html');
    }else{
        res.redirect('/');
    }
});

app.post('/join',async(req, res) => {
    if (session.usernames.includes(req.cookies.username)){
        if(functions.joinFixRoom(req)){
            res.redirect('/game');
        }
    }else{
        res.redirect('/');
    }
});

app.post('/newLobby', async(req, res) => {
    if (session.usernames.includes(req.cookies.username)){
        if(req.body.priv){
            if(functions.createPrivateRoom(req)){
                res.redirect('/game');
            }
        }else{
            if(functions.createRoom(req)){
                res.redirect('/game');
            }
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

app.get('/cssg',(req, res) => {
    res.sendFile(__dirname + '/public/style/game.css');
});

app.get('/js',(req, res) => {
    res.sendFile(__dirname + '/public/main.js');
});

app.get('/soruce',(req, res) => {
    res.sendFile(__dirname + '/public/sources/'+req.query.src);
});

app.get('/probajs',(req, res) => {
    res.sendFile(__dirname + '/public/proba.js');
});

    //\
   // \\
  //   \\
 //     \\
//  API  \\

app.get('/getquestion', async (req, res) => {
    if (session.usernames.includes(req.cookies.username)){
        let question = await functions.selectRandomQuestion();
        res.json(question);
    }else{
        res.redirect('/');
    }
});


app.get('/stats', async (req, res) => {
    if (session.usernames.includes(req.cookies.username)){
        let stats= await functions.getStats();
        res.json(stats);
    }else{
        res.redirect('/');
    }
});

app.get('/roomList', async (req, res) => {
    if (session.usernames.includes(req.cookies.username)){
        let roomList = await functions.getRoomList();
        res.json(roomList);
    }else{
        res.redirect('/');
    }
});

//websocket

app.ws('/ws', async(ws, req) => {
    ws.on('open', async () => {
        //A kliens csatlakozott
    });
    ws.on('message', async (msg) => {
        //A kliens üzenetet küldött
        let loobystatus = await functions.getLobbyStatus(req);
        switch (loobystatus){
            case 'waiting_for_player':
            case 'waiting_for_private':
                ws.send(JSON.stringify({status: 'waiting_for_player'}));
                break;
            case 'korkezdes':
                let realgamestate = await functions.checkRealGameState(req);
                let reamingTime = await functions.checkTime(req);
                let datas = await functions.getSkinHpSp(req);
                if(realgamestate==1){
                    ws.send(JSON.stringify({status: 'prepare', time: reamingTime, userDatas: datas}));
                }
                if(realgamestate==2){
                    ws.send(JSON.stringify({status: 'wait_for_action'}));
                }
                realmsg = JSON.parse(msg);
                switch(realmsg.action){ 
                    case '0':
                        if(await functions.checkGameState(req, 0)){
                            let q = functions.selectRandomQuestion();
                            ws.send(JSON.stringify({status: 'wait_for_question', question: q}));
                            functions.setAction(req, msg);
                        }
                        //Támadás
                        break;
                    case '1':
                        if(await functions.checkGameState(req, 1)){
                            let q = functions.selectRandomQuestion();
                            ws.send(JSON.stringify({status: 'wait_for_question', question: q}));
                            functions.setAction(req, msg);
                        }
                        //Védekezés
                        break;
                    case '2':
                        if (await functions.checkGameState(req, 2)){
                            let q = functions.selectRandomQuestion();
                            ws.send(JSON.stringify({status: 'wait_for_question', question: q}));
                            functions.setAction(req, msg);
                        }
                        //Heal
                        break;
                    case '3':
                        if(await functions.checkGameState(req, 3)){
                            let q = functions.selectRandomQuestion();
                            ws.send(JSON.stringify({status: 'wait_for_question', question: q}));
                        }
                        //Tanulás
                        break;
                    case '4':
                        if(await functions.checkGameState(req, 4)){
                            if(await functions.checkAnswer(req, 0)){
                                ws.send(JSON.stringify({status: 'result', answers: ['válasz1', 'válasz2', 'válasz3', 'válasz4'], correct: 0}));
                                doAction();
                            }   
                        }
                        //válasz v1
                        break;
                    case '5':
                        if(await functions.checkGameState(req, 5)){
                            if(await functions.checkAnswer(req, 1)){
                                ws.send(JSON.stringify({status: 'result', answers: ['válasz1', 'válasz2', 'válasz3', 'válasz4'], correct: 1}));
                                doAction();
                            }
                        }
                        //válasz v2
                        break;
                    case '6':
                        if(await functions.checkGameState(req, 6)){
                            if(await functions.checkAnswer(req, 2)){
                                ws.send(JSON.stringify({status: 'result', answers: ['válasz1', 'válasz2', 'válasz3', 'válasz4'], correct: 2}));
                                doAction();
                            }
                        }
                        //válasz v3
                        break;
                    case '7':
                        if(await functions.checkGameState(req, 7)){
                            if(await functions.checkAnswer(req, 3)){
                                ws.send(JSON.stringify({status: 'result', answers: ['válasz1', 'válasz2', 'válasz3', 'válasz4'], correct: 3}));
                                doAction();
                            }
                        }
                        //válasz v4
                        break;

                }  
                break;
        }
    });
    ws.on('close', async () => {
        //A kliens lecsatlakozott
    });
});

//Game states: 1 - prepare, 2 - actionchoosing, 3 - quetioning, 4 - result
setInterval(() => {
    console.log('Timer');
    functions.timer();
}, 1000);


// Indítás \\

app.listen(process.env.PORT || 3000, () => {
   console.log(`Backend server is running on port ${process.env.PORT || 3000}`);
});

