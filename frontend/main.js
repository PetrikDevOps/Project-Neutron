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

let main = () => {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'green';
    ctx.fillRect(10, 10, 100, 100);
}

main()