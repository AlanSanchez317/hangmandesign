$(document).ready(function() {
    //Array of words for the game
    var words = ['rhythm', 'westmec', 'github', 'javascript', 'canes', 'coding']

    var chosenWord = words[Math.floor(Math.random()*words.length)];
    var guessedWord = [];
    var remainingGuesses = 6

    //Display underscores for each letter of the chosen word
    for (var i = 0; i < chosenWord.length; i++){
        $('#word-container').append('<div class = "hidden-letter">_</div>')
    }

    //Function to update the display of the guessed letters
    function updatedGuesses(){
        $('#guess-container').empty()
        $('#guess-container').text("Guessed letters: " + guessedLetters.join(', '))

    }

    function checkGuess(Letter){
        if(chosenWord.indexOf(Letter) === -1){
            remainingGuesses--
            $('#remaining-guesses').text("Remaining guesses: " + remainingGuesses)
        } else {
            //Reveal the guessed letter
            $(".hidden-letter").each(function(index){
                if(chosenWord[index] === Letter){
                    $(this).text(Letter)
                }
            })
        }

    updatedGuesses()
    checkGamestatus()
}

    //function to check if the game has been won or not
    function checkGamestatus() {
        if($('.hidden-letter:contains("_")').length === 0) {
            alert('Congratulations! You win!')
            resetGame()
        }else if (remainingGuesses === 0) {
            alert("You suck, the word was: " + chosenWord)
            resetGame()
        }
    }

    //function to reset the game
    function resetGame() {
        guessedLetters = []
        remainingGuesses = 6
        $('#remaining-guesses').text('Remaining Guesses: ' + remainingGuesses)
        $('#word-container').empty()
        chosenWord = words[Math.floor(Math.random()*words.length)];
        for (var i = 0; i < chosenWord.length; i++){
            $('#word-container').append('<div class = "hidden-letter">_</div>')
        }
        updatedGuesses()
    }

    //Event handler for all key presses
    $(document).keypress(function(event){
        var letter = String.fromCharCode(event.which).toLowerCase();
        if(letter.match(/[a-z]/) && guessedLetters.indexOf(letter) === -1){
            guessedLetters.push(letter)
            checkGuess(letter)
        }
    })

    //Event handler for the reset button
    $('#reset-button').click(function(){
        resetGame()
    })

    $('remaining-guesses').text("Remaining guesses: " + remainingGuesses);
});