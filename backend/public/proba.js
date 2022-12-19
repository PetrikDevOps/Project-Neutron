const socket = new WebSocket('ws://localhost:3000/ws');
socket.addEventListener('open', function (event) {
    socket.send('Hello Server!');
});
socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
});
socket.addEventListener('close', function (event) {
    console.log('Connection closed');
});

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
    player.draw(canvas)
}

main()