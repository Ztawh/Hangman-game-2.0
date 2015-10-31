document.addEventListener('DOMContentLoaded', function (){

});

document.getElementById("start").addEventListener("click", playGame);

var fragment = document.createDocumentFragment();

function isLetter(keyCode){
    var character = String.fromCharCode(keyCode).toLowerCase();
    return character.length === 1 && character.match(/[a-z]/i);
    //addValueToNode(letter);
}

//function addValueToNode(guessedLetter){    
//    var nodes = document.getElementsByClassName(guessedLetter);
//    if(nodes){

//        for (var i = 0; i < nodes.length; i++){
//            nodes[i].textContent = guessedLetter;
//        }   
//    }
//}

function playGame() {
    var availableWords = ["schnitzel", "juice", "crocodile", "kurosaki"];
    
    var word = availableWords[Math.floor(Math.random() * availableWords.length)];

    for (var i=0; i < word.length; i++) {
        var div = document.createElement("div");
        div.className = "underscore " + word[i];
        div.textContent = "_";
        fragment.appendChild(div);
    }

    var content = document.getElementsByClassName("content")[0];
    content.appendChild(fragment);


    var guessedLetter;
    var keyCode;
    var letter;
    window.addEventListener("keyup", function (event) {
        //isLetter(event.keyCode);

        keyCode = event.keyCode;

        if(isLetter(keyCode)){
           letter = String.fromCharCode(keyCode).toLowerCase();

        }

        //alert(letter);
    });

    alert(letter);
   
    var nodes = document.getElementsByClassName(letter);
    if(nodes){

        for (var i = 0; i < nodes.length; i++){
            nodes[i].textContent = letter;
        }   
    }


    //guessedLetter = isLetter(letter);

    //alert(guessedLetter);

    //var nodes = document.getElementsByClassName(guessedLetter);
    //if(nodes){

    //    for (var i = 0; i < nodes.length; i++){
    //        nodes[i].textContent = guessedLetter;
    //    }   
    //}


}
