const socket = new WebSocket('ws://localhost:3000/ws');
socket.addEventListener('open', function (event) {
    socket.send('Hello Server!');
});
socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
    que.push(event.data)
});
socket.addEventListener('close', function (event) {
    console.log('Connection closed');
});

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
        ctx.drawImage(this.skin, this.x, this.y, 100, 100);
    }
}

let main = () => {
    let canvas = document.getElementById('main-display')
    let player = new Player('Player', 0, 0, 'test2', 100, 100, 10)
    let kérdés = new Kérdés(que[0].kérdés, que[0].válaszok, que[0].id)
    console.log(kérdés);
    player.draw(canvas)
    kérdés.disply()

}

main()