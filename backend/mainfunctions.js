const argon = require('argon2');
const db = require('./db');


async function register(incom) {
    let user = incom.username;
    let pass = incom.password;
    let email = incom.email;
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
        res.redirect('/?error=Wrong username or password');
    }
    for(let i = 0;i<result.length;i++){
        if(await argon.verify(result[i].pwhash, pass)){
            return true;
        }else{
            return false;
        }
    }
}


module.exports = {
    register,
    login
}