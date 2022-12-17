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

let main = () => {

}

main()