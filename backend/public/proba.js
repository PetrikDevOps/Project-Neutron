const socket = new WebSocket('ws://localhost:3000/ws');

socket.addEventListener('open', function (event) {
    socket.send('Client connected');
});
socket.addEventListener('message', function (event) {
    let realmsg = JSON.parse(event.data)
    if(realmsg.status == 'waiting_for_player'){
        setTimeout(checkStatus, 1000);
        console.log('Waiting for player');
    }else if(realmsg.status == 'prepare'){
    }
});
socket.addEventListener('close', function (event) {
    console.log('Connection closed');
});

function checkStatus(){
    socket.send('checkStatus');
}


//Preisler Hülyesége


let que = [
    {
        'kérdés': 'Melyik a legjobb?',
        'válaszok': ['A', 'B', 'C', 'D'],
        'id': 1
    },
    {
        'kérdés': 'Melyik alma?',
        'válaszok': ['A', 'B', 'C', 'D'],
        'id': 2
    },
]

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

class Player {
    constructor(name, x, y, skin, hp, sp, ad) {
        this.name = name
        this.x = x
        this.y = y
        this.skin = document.getElementById(skin)
        this.hp = hp
        this.sp = sp
        this.ad = ad
    }
    draw(canvas) {
        let ctx = canvas.getContext('2d')
        ctx.drawImage(this.skin, this.x, this.y, 200, 200);
    }
}

let main = () => {
    let canvas = document.getElementById('main-display')
    let player = new Player('Player', 100, 800, 'test2', 400, 400, 10)
    let player2 = new Player('Player2', 1500, 800, 'test', 400, 400, 10)
    let kérdés = new Kérdés(que[0].kérdés, que[0].válaszok, que[0].id)
    console.log(kérdés);
    player.draw(canvas)
    player2.draw(canvas)
    kérdés.disply()

}

main()