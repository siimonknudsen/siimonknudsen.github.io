
var audioArray = []
audioArray.push(new Audio ('audio/wave1.wav'))
audioArray.push(new Audio ('audio/wave2.wav'))
audioArray.push(new Audio ('audio/wave3.wav'))

function audioPlay (number){

    audioArray[number].play()


}
