const letterBank = document.getElementById("letter-bank")
const letter = document.getElementById("letter")
const wordGuess = document.getElementById("word")
const score = document.getElementById("score")
const state = document.getElementById("state")

let guessCount = 0
let hiddenWord = []
let word = ""
let indexes = []
let continueGame = true

const getNewWord = () => {
    fetch('https://random-word-api.herokuapp.com/word')
    .then((response) => response.json())
    .then((data) => {
        word = data[0]
        console.log(word)
        hiddenWord = (word.split("")).map(() => "_")
        guessCount = (new Set(word.split(""))).size * 2
        indexes = []
        continueGame = true
        score.innerText = guessCount
        createHidden()
        
    });
    letterBank.innerText = ""
}

const createHidden = () => {
    wordGuess.innerHTML = ""
    for (let i = 0; i < hiddenWord.length; i++){
        if (indexes.includes(i)){
            wordGuess.innerHTML += `<div class='letter fade-in-text'>${hiddenWord[i]}</div>`
        }else{
            wordGuess.innerHTML += `<div class='letter not-fade-in'>${hiddenWord[i]}</div>`
        }
    }
    indexes = []

    if (!(hiddenWord.includes("_"))){
        winState()
    }
}

const updateHidden = (letter) => {
    for (let i = 0; i < word.length; i++){
        if (word[i] === letter){
            indexes.push(i)
            hiddenWord[i] = letter
        }
    }
    console.log(hiddenWord)
    createHidden()
}

const loseState = () => {
    letterBank.innerHTML = ""
    letterBank.innerText = "You ran out of guesses!"
    continueGame = false
}
const winState = () => {
    letterBank.innerHTML = "You got it!"
    continueGame = false
}

const addLetter = (e) => {
    if (letter.value.length < 1 || e.keyCode !== 13 
        || continueGame === false || word.length === 0) {
        letter.value = ""
        return
    }
    let char = letter.value.toLowerCase()
    let bank = letterBank.innerText
    
    if (!(bank.includes(char)) && (/^[a-z]+$/gi.test(char) && char.length === 1)){
        guessCount -= 1
        score.innerText = guessCount
        if (guessCount <= 0){
            letter.value = ""
            loseState()
            return
        }
        letterBank.innerHTML += `<div class='usedletter'>${char}</div>`
        updateHidden(char)
    }
    letter.value = ""
}



