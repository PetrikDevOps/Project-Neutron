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
            let test = document.getElementById('test')
            let ctx = canvas.getContext('2d')
            test.style.color = 'rgb(' + Math.floor(Math.random()*255) + ', ' + Math.floor(Math.random()*255) + ',' + Math.floor(Math.random()*255)+ ')'
            ctx.fillStyle = test.style.color
            ctx.fillRect(i * 100, j * 100, 100, 100)
        }
    }
}

let main = () => {
    genMap()
}

main()