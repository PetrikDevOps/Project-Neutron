const argon = require('argon2');
const db = require('./db');
const session = require('express-session');

async function register(incom) {
    let crypetdPassword = await argon.hash(incom.password);
    if (incom.password !== incom.password2) {
        res.redirect('/?error=Passwords do not match');
    }
    let sameNames = await db.query("SELECT * FROM profiles WHERE name = ?", [incom.username]);
    let sameEmails = await db.query("SELECT * FROM profiles WHERE email = ?", [incom.email]);
    if (sameNames.length > 0) {
        return '/?error=Username already exists';
    }
    if (sameEmails.length > 0) {
        return '/?error=Email already exists'
    }
    if(sameEmails.length == 0 && sameNames.length == 0){
        db.query("INSERT INTO profiles (name, pwhash, email) VALUES (?, ?, ?)", [incom.username, crypetdPassword, incom.email]).catch((err) => {
            console.log(err);
        });
        return '/?status=Registration successful';
    }
}



async function login(incom) {
    let user = incom.username;
    let pass = incom.password;
    let result = await db.query("SELECT * FROM profiles WHERE name = ?", [user]);
    if (result.length === 0) {
        return false;
    }
    for(let i = 0;i<result.length;i++){
        if(await argon.verify(result[i].pwhash, pass)){
            let toassign = {'id' : result[i].id,name: result[i].name}
            session.userIds.push(toassign);
            return true;
        }else{
            return false;
        }
    }
}

async function createRoom(incom) {
    let id = session.userIds.find(x => x.name === incom.cookies.username).id;
    let roomIdentifier = makeid()
    // check room identifier if exists
    let roomIdfChk = await db.query("SELECT * FROM rooms WHERE identifier = ?", [roomIdentifier]);
    if (roomIdfChk.length > 0) {
        return createRoom(incom);
    }else{
        let result = await db.query("INSERT INTO rooms (userIdOne,identifier) VALUES (?,?)", [id,roomIdentifier]);
        return true;
    }
}

async function joinRandomRoom(incom) {
    let userid = session.userIds.find(x => x.name === incom.cookies.username).id;
    let result = await db.query("SELECT * FROM rooms WHERE userIdOne IS NOT NULL AND userIdTwo IS NULL AND private = 0");
    if (result.length === 0) {
        return createRoom(incom);
    }else{
        let deletedrooms = []
        for (let i = 0; i < result.length; i++){
            if (result[i].userIdOne === userid || result[i].userIdTwo === userid){
                if(result[i].userIdTwo === userid){
                    alertEnemyDc(result[i].userIdOne)
                }else{
                    alertEnemyDc(result[i].userIdTwo)
                }
                let delroom = await db.query("DELETE FROM rooms WHERE id = ?", [result[i].id]);
                deletedrooms.push(result[i].id);
            }
        }
        if(deletedrooms.length === result.length){
            return createRoom(incom);
        }else{
            for(let i = 0;i<result.length;i++){
                if(!deletedrooms.includes(result[i].id)){
                    let roomId = result[i].id;
                    session.roomId = roomId; //Cserélni kell
                    await db.query("UPDATE rooms SET userIdTwo = ? WHERE id = ?", [userid, roomId]);
                    return true
                }
            }
        }
    }
}

async function selectRandomQuestion() {
    let result = await db.query("SELECT * FROM questions ORDER BY RAND() LIMIT 1");
    let question = result[0].question;
    let answer = result[0].answers.split(',');
    return [question, answer, result[0].id];
}

async function getStats() {
    let id = session.userIds.find(x => x.name === incom.cookies.username).id;
    let result = await db.query("SELECT wins, games, exp, korong FROM profiles WHERE id = ?", [id]);
    console.log(result[0]);
    return result[0];
}

async function alertEnemyDc(enemyId) {
}

function makeid() {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 5; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

async function deleteAllRoom() {
    await db.query("DELETE FROM rooms");
}

async function getRoomList() {
    let result = await db.query("SELECT id, identifier FROM rooms WHERE userIdOne IS NOT NULL AND userIdTwo IS NULL");
    return result;
}

async function joinFixRoom(incom) {
    let userid = session.userIds.find(x => x.name === incom.cookies.username).id;
    let tojoin = incom.body.roomKey;
    let roomWithId = await db.query("SELECT * FROM rooms WHERE identifier = ?", [tojoin]);
    if (roomWithId.length === 0) {
        return false;
    }else{
        if (roomWithId[0].userIdTwo == null) {
            await db.query("UPDATE rooms SET userIdTwo = ? WHERE identifier = ?", [userid, tojoin]);
            return true;
        }else{
            return false;
        }
    }
}

async function createPrivateRoom(incom) {
    let id = session.userIds.find(x => x.name === incom.cookies.username).id;
    let roomIdentifier = makeid()
    // check room identifier if exists
    let roomIdfChk = await db.query("SELECT * FROM rooms WHERE identifier = ?", [roomIdentifier]);
    if (roomIdfChk.length > 0) {
        return createPrivateRoom(incom);
    }else{
        let result = await db.query("INSERT INTO rooms (userIdOne,identifier,private) VALUES (?,?,1)", [id,roomIdentifier]);
        return true;
    }
}

async function getGameStatus(incom){
    possibelStatus = ['Answering','Enemy_atack','waiting_for_player','waiting_for_private','in_menu']
    let roomcheckPlayerInRoom = await db.query("SELECT * FROM rooms WHERE userIdOne = ?", [session.userIds.find(x => x.name === incom.cookies.username).id]); //Cserélni kell
    if (roomcheckPlayerInRoom.length === 0) {
        return possibelStatus[4];
    }else{
        if (roomcheckPlayerInRoom[0].userIdTwo === null){
            if (roomcheckPlayerInRoom[0].private==1){
                return possibelStatus[3];
            }else{
                return possibelStatus[2];
            }
        }  
    }
}

module.exports = {
    register,
    login,
    createRoom,
    joinRandomRoom,
    selectRandomQuestion,
    getStats,
    deleteAllRoom,
    getRoomList,
    joinFixRoom,
    createPrivateRoom,
    getGameStatus
}