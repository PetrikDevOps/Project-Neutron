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
    constructor(question, answers) {
        this.question = question
        this.answers = answers
    }
    disply() {
        document.getElementById('kérdés').innerHTML = this.question
        for (let i = 0; i < this.answers.length; i++) {
            document.getElementById('válasz' + i).innerHTML = this.answers[i]
        }
    }
    colorIt(n, color) {
        for (let i = 0; i < 4; i++) {
            document.getElementById('válasz' + i).style.color = 'red'
        }
        document.getElementById('válasz' + n).style.color = color
    }
}

let players_list = [];
let canvas = document.getElementById('main-display')
let action = 0

const socket = new WebSocket('ws://localhost:3000/ws');

socket.addEventListener('open', async function (event) {
    socket.send(JSON.stringify({action: 'Client connected'}));
});
socket.addEventListener('message', async function (event) {
    let realmsg = JSON.parse(event.data)
    console.log(realmsg);


    if(realmsg.status == 'waiting_for_player'){
        //server újra küldi a status-t
        setTimeout(checkStatus, 1000);
        console.log('Waiting for player');
        //kliens nem add vissza semmit
    }else if(realmsg.status == 'prepare'){
        //server vissza add egy {userDatas: {client: {skin: 'skin1', hp: 7, sp: 0s}, enemy: {skin: 'skin2', hp: 7, sp: 0}}}
        setTimeout(checkStatus, 1000);
        players_list.push(new Player(1500, 800, realmsg.userDatas.client.skin, realmsg.userDatas.client.hp, realmsg.userDatas.client.sp));
        players_list.push(new Player(100, 800, realmsg.userDatas.enemy.skin, realmsg.userDatas.enemy.hp, realmsg.userDatas.enemy.sp));
        displayPlayers(players_list)
        //kliens nem add vissza semmit
    }else if(realmsg.status == 'wait_for_action'){
        //szerver vár!
        let q = new Kérdés('Mit szeretnél csinálni', ['Támadás', 'Védekezés', 'Heal', 'Tanulás'])
        q.disply()
        setTimeout(endPhase(0), 9000);
        //kliens vissza add egy {action: 0-3}
    }else if(realmsg.status == 'wait_for_question'){
        //server vissza add egy {question: kérdés, answers: [válasz1, válasz2, válasz3, válasz4]}
        let q = new Kérdés(realmsg.question, realmsg.answers)
        q.disply()
        setTimeout(endPhase(4), 19000);
        //kliens vissza add egy {action: 0-3}
    }else if(realmsg.status == 'result'){
        //server vissza add egy {question: kérdés, answers: [válasz1, válasz2, válasz3, válasz4], correct: helyes válasz indexe}
        let q = new Kérdés('Kérdésre a helyes válasz: ', realmsg.answers)
        q.disply()
        q.colorIt(realmsg.correct, 'green')
        //kliens nem add vissza semmit
    }else if(realmsg.status == 'end'){
        //server vissza add egy {winner: győztes neve}
        alert('End!!\n' + realmsg.winner + ' nyert!');
        //kliens nem add vissza semmit
    }
});
socket.addEventListener('close', async function (event) {
    console.log('Connection closed');
});

function checkStatus(){
    socket.send(JSON.stringify({action:'checkStatus'}));
}

let butPres = (n) =>{
    action = n
}

let endPhase = (value) =>{
    socket.send(JSON.stringify({action :(action + value) }));
    
}

let displayPlayers = (list) => {
    for (let i = 0; i < list.length; i++) {
        list[i].draw(canvas)
        list[i].drawHP(canvas)
    }
}