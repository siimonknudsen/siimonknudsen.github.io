function waveAnimation () {
    var wave = document.getElementById('wavepng')
    for (let index = 0; index < 100; index++) {
        const currentPos = wave.style.left
        wave.style.left = currentPos + 5 + "px"
    }
}