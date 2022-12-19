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



let genMap = () => {
    for (let i = 0; i < 18; i++) {
        for (let j = 0; j < 10; j++) {
            let canvas = document.getElementById('main-display')
            let ctx = canvas.getContext('2d')
            let img = document.getElementById("test");
            ctx.drawImage(img, 100*i, 100*j, 100, 100);
        }
    }
}


let main = () => {
    genMap()
}

main()