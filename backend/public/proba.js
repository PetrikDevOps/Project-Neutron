class Player {
    constructor( x, y, skin, hp, sp, ad) {
        this.x = x
        this.y = y
        this.skin = document.getElementById(skin)
        this.hp = hp
        this.sp = sp
    }
    draw(canvas) {
        let ctx = canvas.getContext('2d')
        ctx.drawImage(this.skin, this.x, this.y, 200, 200);
    }
    drawHP(canvas) {
        let ctx = canvas.getContext('2d')
        ctx.fillStyle = "rgb(0, 0, 0, 1)";
        ctx.fillRect(this.x, this.y - 50, 7 * 30, 20);
        ctx.fillStyle = "rgb(255, 0, 0, 0.7)";
        ctx.fillRect(this.x, this.y - 50, this.hp * 30, 20);
    }
}

class Kérdés {
    constructor(question, answers, id) {
        this.question = question
        this.answers = answers
        this.id = id
    }
    disply() {
        document.getElementById('kérdés').innerHTML = this.question
        for (let i = 0; i < this.answers.length; i++) {
            document.getElementById('válasz' + i).innerHTML = this.answers[i]
        }
    }
}

let players_list = [];
let canvas = document.getElementById('main-display')
let action = 0

const socket = new WebSocket('ws://localhost:3000/ws');

socket.addEventListener('open', async function (event) {
    socket.send('Client connected');
});
socket.addEventListener('message', async function (event) {
    let realmsg = JSON.parse(event.data)
    console.log(realmsg);
    if(realmsg.status == 'waiting_for_player'){
        setTimeout(checkStatus, 1000);
        console.log('Waiting for player');
    }else if(realmsg.status == 'prepare'){
        players_list.push(new Player(1500, 800, realmsg.userDatas.client.skin, realmsg.userDatas.client.hp, realmsg.userDatas.client.sp));
        players_list.push(new Player(100, 800, realmsg.userDatas.enemy.skin, realmsg.userDatas.enemy.hp, realmsg.userDatas.enemy.sp));
        displayPlayers(players_list)
        socket.send('info_received');
    }else if(realmsg.status == 'wait_for_action'){
        let q = new Kérdés('Mit szeretnél csinálni', ['Támadás', 'Védekezés', 'Heal', 'Tanulás'], 1)
        q.disply()
        setTimeout(endPhase, 19000);

    }else if(realmsg.status == 'wait_for_question'){
        let q = new Kérdés(realmsg.question, realmsg.answers, realmsg.id)
        q.disply()
        setTimeout(endPhase, 19000);
    }
});
socket.addEventListener('close', async function (event) {
    console.log('Connection closed');
});

function checkStatus(){
    socket.send('checkStatus');
}

let butPres = (n) =>{
    action = n
}

let endPhase = () =>{
    socket.send('endAct: ' + action);
}

let displayPlayers = (list) => {
    for (let i = 0; i < list.length; i++) {
        list[i].draw(canvas)
        list[i].drawHP(canvas)
    }
}