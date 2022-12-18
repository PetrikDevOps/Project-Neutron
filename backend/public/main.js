const endpoint="http://localhost:3000/game?isApi=true";

let changeRegLog = (wannaReg) => {
    let reg = document.getElementById('register-block')
    let log = document.getElementById('login-block')
    if (wannaReg) {
        reg.style.display = 'flex'
        log.style.display = 'none'
    } else {
        reg.style.display = 'none'
        log.style.display = 'flex'
    }
}

let changeLobbyDisplay = (mode) => {
    let fastGame = document.getElementById('fast-game')
    let createGame = document.getElementById('lobby-game')
    let profile = document.getElementById('profile')
    if (mode === 'fast') {
        fastGame.style.display = 'flex'
        createGame.style.display = 'none'
        profile.style.display = 'none'
    }
    else if (mode === 'create') {
        fastGame.style.display = 'none'
        createGame.style.display = 'flex'
        profile.style.display = 'none'
    }
    else{
        fastGame.style.display = 'none'
        createGame.style.display = 'none'
        profile.style.display = 'flex'
    }
}

let genMap = () => {
    for (let i = 0; i < 18; i++) {
        for (let j = 0; j < 10; j++) {
            let canvas = document.getElementById('main-display')
            let ctx = canvas.getContext('2d')
            let img = document.getElementById("test");
            let img1 = new Image(100, 100, img.src)
            ctx.drawImage(img1, 10, 10);
        }
    }
}

let main = () => {
    genMap()
}

main()