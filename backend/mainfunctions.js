const argon = require('argon2');
const db = require('./db');
const session = require('express-session');

async function register(incom) {
    let crypetdPassword = await argon.hash(incom.password);
    if (incom.password !== incom.password2) {
        res.redirect('/?error=Passwords do not match');
    }
    let sameNames = await db.query("SELECT * FROM profiles WHERE name = ?", [incom.username]).catch((err) => {console.log(err);});
    let sameEmails = await db.query("SELECT * FROM profiles WHERE email = ?", [incom.email]).catch((err) => {console.log(err);})
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
    let result = await db.query("SELECT * FROM profiles WHERE name = ?", [user]).catch((err) => {console.log(err);})
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
    let roomIdfChk = await db.query("SELECT * FROM rooms WHERE identifier = ?", [roomIdentifier]).catch((err) => {console.log(err);})
    if (roomIdfChk.length > 0) {
        return createRoom(incom);
    }else{
        let result = await db.query("INSERT INTO rooms (userIdOne,identifier) VALUES (?,?)", [id,roomIdentifier]).catch((err) => {console.log(err);});
        return true;
    }
}

async function joinRandomRoom(incom) {
    let userid = session.userIds.find(x => x.name === incom.cookies.username).id;
    let result = await db.query("SELECT * FROM rooms WHERE userIdOne IS NOT NULL AND userIdTwo IS NULL AND private = 0").catch((err) => {console.log(err);})
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
                await db.query("DELETE FROM rooms WHERE id = ?", [result[i].id]).catch((err) => {console.log(err);})
                deletedrooms.push(result[i].id);
            }
        }
        if(deletedrooms.length === result.length){
            return createRoom(incom);
        }else{
            for(let i = 0;i<result.length;i++){
                if(!deletedrooms.includes(result[i].id)){
                    let roomId = result[i].id;
                    await db.query("UPDATE rooms SET userIdTwo = ?, gameState = 1 WHERE id = ?", [userid, roomId]).catch((err) => {console.log(err);})
                    enableRoom(incom);
                    return true
                }
            }
        }
    }
}

async function getMyQuestion(incom) {
    let id = session.userIds.find(x => x.name === incom.cookies.username).id;
    let result = await db.query("SELECT questions.question, questions.answers FROM questions INNER JOIN rooms ON rooms.questionId = questions.id WHERE rooms.userIdOne = ? OR rooms.userIdTwo =?", [id,id]).catch((err) => {console.log(err);})
    return result[0].question;
}

async function getStats() {
    let id = session.userIds.find(x => x.name === incom.cookies.username).id;
    let result = await db.query("SELECT wins, games, exp, korong FROM profiles WHERE id = ?", [id]).catch((err) => {console.log(err);})
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
    await db.query("DELETE FROM rooms").catch((err) => {console.log(err);})
}

async function getRoomList() {
    let result = await db.query("SELECT id, identifier FROM rooms WHERE userIdOne IS NOT NULL AND userIdTwo IS NULL").catch((err) => {console.log(err);})
    return result;
}

async function joinFixRoom(incom) {
    let userid = session.userIds.find(x => x.name === incom.cookies.username).id;
    let tojoin = incom.body.roomKey;
    let roomWithId = await db.query("SELECT * FROM rooms WHERE identifier = ?", [tojoin]).catch((err) => {console.log(err);})
    if (roomWithId.length === 0) {
        return false;
    }else{
        if (roomWithId[0].userIdTwo == null) {
            await db.query("UPDATE rooms SET userIdTwo = ?, gameState = 1 WHERE identifier = ?", [userid, tojoin]).catch((err) => {console.log(err);})
            enableRoom(incom);
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
    let roomIdfChk = await db.query("SELECT * FROM rooms WHERE identifier = ?", [roomIdentifier]).catch((err) => {console.log(err);})
    if (roomIdfChk.length > 0) {
        return createPrivateRoom(incom);
    }else{
        await db.query("INSERT INTO rooms (userIdOne,identifier,private) VALUES (?,?,1)", [id,roomIdentifier]).catch((err) => {console.log(err);})
        return true;
    }
}

async function getLobbyStatus(incom){
    possibelStatus = ['waiting_for_player','waiting_for_private','in_menu','korkezdes' ]
    let roomcheckPlayerInRoom = await db.query("SELECT * FROM rooms WHERE userIdOne = ?", [session.userIds.find(x => x.name === incom.cookies.username).id]).catch((err) => {console.log(err);})
    if (roomcheckPlayerInRoom.length === 0) {
        return possibelStatus[2];
    }else{
        if (roomcheckPlayerInRoom[0].userIdTwo === null){
            if (roomcheckPlayerInRoom[0].private==1){
                return possibelStatus[1];
            }else{
                return possibelStatus[0];
            }
        }else{
            return possibelStatus[3];
        }
    }
}

async function checkTime(incom){
    let id = session.userIds.find(x => x.name === incom.cookies.username).id;
    let room = await db.query("SELECT * FROM rooms WHERE userIdOne = ? OR userIdTwo = ?", [id,id]).catch((err) => {console.log(err);})
    return room[0].timer;
}


async function getSkinHpSp(incom){
    let id = session.userIds.find(x => x.name === incom.cookies.username).id;
    let room = await db.query("SELECT * FROM rooms WHERE userIdOne = ? OR userIdTwo = ?", [id,id]).catch((err) => {console.log(err);})
    if (room.length === 0) {
        return false;
    }else{
        let playerOneId = room[0].userIdOne;
        let playerTwoId = room[0].userIdTwo;
        let playerOneActiveData = await db.query("SELECT profiles.name, profiles.active_hp, profiles.active_knoweladge, skinlist.skinSrc FROM `profiles` INNER JOIN skinlist ON profiles.skin = skinlist.id WHERE profiles.id = ?", [playerOneId]).catch((err) => {console.log(err);})
        let playerTwoActiveData = await db.query("SELECT profiles.name, profiles.active_hp,  profiles.active_knoweladge, skinlist.skinSrc FROM `profiles` INNER JOIN skinlist ON profiles.skin = skinlist.id WHERE profiles.id = ?", [playerTwoId]).catch((err) => {console.log(err);})
        if(id == playerOneId){
            let j = {
                client:{
                    skin: playerOneActiveData[0].skinSrc,
                    hp: playerOneActiveData[0].active_hp,
                    sp: playerOneActiveData[0].active_knoweladge
                },
                enemy:{
                    skin: playerTwoActiveData[0].skinSrc,
                    hp: playerTwoActiveData[0].active_hp,
                    sp: playerTwoActiveData[0].active_knoweladge
                }
            }
            return j
        }else{
            let j = {
                client:{
                    skin: playerTwoActiveData[0].skinSrc,
                    hp: playerTwoActiveData[0].active_hp,
                    sp: playerTwoActiveData[0].active_knoweladge
                },
                enemy:{
                    name: playerOneActiveData[0].name,
                    skin: playerOneActiveData[0].skinSrc,
                    hp: playerOneActiveData[0].active_hp,
                    sp: playerOneActiveData[0].active_knoweladge
                }
            }
            return j
        }
    }
}

async function enableRoom(incom){
    let id = session.userIds.find(x => x.name === incom.cookies.username).id;
    let room = await db.query("SELECT * FROM rooms WHERE userIdOne = ? OR userIdTwo = ?", [id,id]).catch((err) => {console.log(err);})
    await db.query("UPDATE rooms SET gameState = 1 WHERE id = ?", [room[0].id]).catch((err) => {console.log(err);})
}

//Game states: 1 - prepare, 2 - actionchoosing, 3 - quetioning, 4 - result
async function timer(){
    let allRoom = await db.query("SELECT * FROM rooms WHERE gameState IS NOT NULL")
    for (let i = 0; i < allRoom.length; i++) {
        if (allRoom[i].timer > 0) {
            await db.query("UPDATE rooms SET timer = ? WHERE id = ?", [allRoom[i].timer-1,allRoom[i].id])
        }else{
           if(allRoom[i].gameState == 1){
               await db.query("UPDATE rooms SET gameState = 2 WHERE id = ?", [allRoom[i].id])
               await db.query("UPDATE rooms SET timer = 10 WHERE id = ?", [allRoom[i].id])
            }else if(allRoom[i].gameState == 2){
                await db.query("UPDATE rooms SET gameState = 3 WHERE id = ?", [allRoom[i].id])
                await db.query("UPDATE rooms SET timer = 20 WHERE id = ?", [allRoom[i].id])
                //set random question to that room
                let question = await db.query("SELECT * FROM questions ORDER BY RAND() LIMIT 1")
                await db.query("UPDATE rooms SET questionId = ? WHERE id = ?", [question[0].id,allRoom[i].id])
            }else if(allRoom[i].gameState == 3){
                
                await db.query("UPDATE rooms SET gameState = 4 WHERE id = ?", [allRoom[i].id])
                await db.query("UPDATE rooms SET timer = 5 WHERE id = ?", [allRoom[i].id])
            }else if(allRoom[i].gameState == 4){
                await db.query("UPDATE rooms SET gameState = 2 WHERE id = ?", [allRoom[i].id])
                await db.query("UPDATE rooms SET timer = 5 WHERE id = ?", [allRoom[i].id])
            }
        }
    }
}

async function Attack(enemy){
    enemy.hp = enemy.hp - 2;
    return enemy;
}
async function Heal(user){
    user.hp = user.hp + 1;
    return user;
}
async function Defend(user, enemy){
    if(enemy.action == 0){
        enemy.hp = enemy.hp - 1;
    }
    return enemy;
}
async function Learn(user){
    user.sp = user.sp + 1;
    return user;
}

async function checkGameState(incom, state){
    let id = session.userIds.find(x => x.name === incom.cookies.username).id;
    let room = await db.query("SELECT * FROM rooms WHERE userIdOne = ? OR userIdTwo = ?", [id,id]).catch((err) => {console.log(err);})
    let roomState = room[0].gameState;
    if (roomState  == 2 && state < 4) {
        return true;
    }else if(roomState == 3 && (state >=4 && state < 8)){
        return true;
    }else{
        return false;
    }
    
}

async function checkRealGameState(incom){
    let playerid = session.userIds.find(x => x.name === incom.cookies.username).id;
    let room = await db.query("SELECT * FROM rooms WHERE userIdOne = ? OR userIdTwo = ?", [playerid,playerid]).catch((err) => {console.log(err);})
    return room[0].gameState;
}

async function setAction(incom,msg){
    msgs = JSON.parse(msg);
    let id = session.userIds.find(x => x.name === incom.cookies.username).id;
    let room = await db.query("SELECT * FROM rooms WHERE userIdOne = ? OR userIdTwo = ?", [id,id]).catch((err) => {console.log(err);})
    if (room[0].userIdOne == id) {
        await db.query("UPDATE rooms SET actionOne = ? WHERE id = ?", [msg.action,room[0].id]).catch((err) => {console.log(err);})
    }else{
        await db.query("UPDATE rooms SET actionTwo = ? WHERE id = ?", [msg.action,room[0].id]).catch((err) => {console.log(err);})
    }
}

async function checkAnswer(incom, user_answer){
    let id = session.userIds.find(x => x.name === incom.cookies.username).id;
    let room = await db.query("SELECT * FROM rooms WHERE userIdOne = ? OR userIdTwo = ?", [id,id]).catch((err) => {console.log(err);})
    let question = await db.query("SELECT * FROM questions WHERE id = ?", [room[0].questionId]).catch((err) => {console.log(err);})
    let answer = question[0].correct;
    if (user_answer == answer) {
        return true;
    }else{
        return false;
    }
}


module.exports = {
    register,
    login,
    createRoom,
    joinRandomRoom,
    getMyQuestion,
    getStats,
    deleteAllRoom,
    getRoomList,
    joinFixRoom,
    createPrivateRoom,
    getLobbyStatus,
    checkTime,
    getSkinHpSp,
    timer,
    checkGameState,
    setAction,
    checkAnswer,
    checkRealGameState
}