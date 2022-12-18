const argon = require('argon2');
const db = require('./db');
const session = require('express-session');

async function register(incom) {
    let crypetdPassword = await argon.hash(incom.password);
    if (incom.password !== incom.password2) {
        res.redirect('/?error=Passwords do not match');
    }
    db.query("INSERT INTO profiles (name, pwhash, email) VALUES (?, ?, ?)", [incom.username, crypetdPassword, incom.email]).catch((err) => {
        console.log(err);
    });
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
            session.userId = result[i].id;
            return true;
        }else{
            return false;
        }
    }
}

async function createRoom(incom) {
    let id = session.userId;
    let result = await db.query("INSERT INTO rooms (userIdOne) VALUES (?)", [id]);
    return "success";
}

async function joinRandomRoom(incom) {
    let id = session.userId;
    let result = await db.query("SELECT * FROM rooms WHERE userIdOne IS NOT NULL AND userIdTwo IS NULL");
    if (result.length === 0) {
        createRoom(incom);
        return false;
    }else{
        let roomId = result[0].id;
        await db.query("UPDATE rooms SET userIdTwo = ? WHERE id = ?", [id, roomId]);
        return true
    }
}

module.exports = {
    register,
    login,
    createRoom,
    joinRandomRoom
}