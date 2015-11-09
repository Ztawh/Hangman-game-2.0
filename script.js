document.addEventListener('DOMContentLoaded', function (){

});

document.getElementById("start").addEventListener("click", playGame);

function isLetter(keyCode) {
    var character = String.fromCharCode(keyCode).toLowerCase();
    return character.length === 1 && character.match(/[a-z]/i);
}

function addUnderscore(word) {
    var fragment = document.createDocumentFragment();

    for (var i=0; i < word.length; i++) {
        var div = document.createElement("div");
        div.className = "underscore " + word[i];
        div.textContent = "_";
        fragment.appendChild(div);
    }
    var content = document.getElementsByClassName("content")[0];
    content.appendChild(fragment);
}

function youWon(word) {
    var fragment = document.createDocumentFragment();

    var winner = document.createElement("winner");
    winner.className = "winner";
    winner.textContent = "Congratulations! You won the game! The ";
    fragment.appendChild(winner);

    var content = document.getElementsByClassName("content")[0];
    content.appendChild(fragment);
}

function availableLetters(alphabet){
    var fragment = document.createDocumentFragment();

    var alphabetInfo = document.createElement("div");
    alphabetInfo.className = "alphabet-info";
    alphabetInfo.textContent = "Please type a letter from the available ones below.";
    fragment.appendChild(alphabetInfo);

    for(var i=0; i < alphabet.length; i++){
        var theAlphabet = document.createElement("div");
        theAlphabet.className = "the-alphabet " + alphabet[i];
        theAlphabet.textContent = alphabet[i];

        fragment.appendChild(theAlphabet);
    }
    var content = document.getElementsByClassName("content")[0];
    content.appendChild(fragment);
}

function gameOver(word){
    var fragment = document.createDocumentFragment();

    var youLost = document.createElement("div");
    youLost.className = "game-over";
    youLost.textContent = "Well, that's embarrasing.. for you. The game, is over. The correct word was '" + word + "'!";
    fragment.appendChild(youLost);

    var content = document.getElementsByClassName("content")[0];
    content.appendChild(fragment);
}

function lives(tries){
    var fragment = document.createDocumentFragment();

    var livesLeft = document.createElement("div");
    livesLeft.className = "lives";
    livesLeft.textContent = "You have " + tries + "lives left.";
    fragment.appendChild(livesLeft);

    var content = document.getElementsByClassName("content")[0];
    content.appendChild(fragment);
}

function playGame() {
    var availableWords = ["schnitzel", "juice", "crocodile", "kurosaki"];
    var word = availableWords[Math.floor(Math.random() * availableWords.length)];

    var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

    var tries = 7;

    availableLetters(alphabet);
    lives(tries);
    addUnderscore(word);

    var guessedKeyCodes = [];
    var keyCode;
    

    var lettersInWord = word.split("").filter(function (element, position){
        return word.indexOf(element) == position;
    });

    window.addEventListener("keyup", function (event) {
        keyCode = event.keyCode;
        var letter;

        if(isLetter(keyCode)){
            if(guessedKeyCodes.indexOf(keyCode) !== -1){
            alert("You have already tried that letter, please select from the remaining letters.");
           }
        }

        guessedKeyCodes.push(keyCode);

        var letter = String.fromCharCode(keyCode).toLowerCase();
        
        var letterClass = document.getElementsByClassName("the-alphabet " + letter);
        console.log("LetterClass", letterClass);
        letterClass[0].textContent = " ";

        if(word.indexOf(letter) !== -1){
            var nodes = document.getElementsByClassName("underscore " + letter);
            for (var i = 0; i < nodes.length; i++){
                nodes[i].textContent = letter;
            }   

            var letterPosition = lettersInWord.indexOf(letter);
            lettersInWord.splice(letterPosition, 1);

            if (lettersInWord.length == 0)
                youWon(word);
        }

        if(word.indexOf(letter) == -1){
            tries -= 1;

            var domNodes = document.getElementsByClassName("lives");
            for(var i = 0; i < domNodes.length; i++){
                domNodes[i].textContent = "You have " + tries + " lives left.";
            }

            if(tries == 0){
                gameOver(word);
            }
        }
    });
}
