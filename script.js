$(document).ready(function() {
    //Array of words for the game
    var words = [
        'rhythm', 'westmec', 'github', 'javascript', 'canes', 'coding', 'hippopotamus',
        'eclipse', 'notebook', 'keyboard', 'jazzman', 'quizzes', 'twelfth', 'gymnast',
        'backdrop', 'monopoly', 'clipping', 'strength', 'flippant', 'kingdom'
    ];
    var chosenWord = words[Math.floor(Math.random()*words.length)];
    var guessedLetters = [];
    var remainingGuesses = 8

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
            drawHangman();
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
        remainingGuesses = 8
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
        $('#hangman-drawing').empty(); 

    })

    $('remaining-guesses').text("Remaining guesses: " + remainingGuesses);

    function drawHangman() {
        const totalChances = 8;
        const partNumber = totalChances - remainingGuesses;
        const svgWidth = 400; 
        const svgHeight = 500; 
        
        const svgns = "http://www.w3.org/2000/svg";
        $('#hangman-drawing').empty();
        
        let svg = document.createElementNS(svgns, 'svg');
        svg.setAttribute('width', svgWidth);
        svg.setAttribute('height', svgHeight);
        svg.setAttribute('viewBox', '0 0 400 500');
    
        const hangmanParts = [
            {type: 'line', attrs: {x1: 100, y1: 450, x2: 300, y2: 450, stroke: 'black', 'stroke-width': 4}}, 
            {type: 'line', attrs: {x1: 200, y1: 50, x2: 200, y2: 450, stroke: 'black', 'stroke-width': 4}}, 
            {type: 'line', attrs: {x1: 200, y1: 50, x2: 300, y2: 50, stroke: 'black', 'stroke-width': 4}}, 
            {type: 'line', attrs: {x1: 300, y1: 50, x2: 300, y2: 100, stroke: 'black', 'stroke-width': 4}}, 
            {type: 'circle', attrs: {cx: 300, cy: 140, r: 40, stroke: 'black', 'stroke-width': 4, fill: 'none'}}, 
            {type: 'line', attrs: {x1: 300, y1: 180, x2: 300, y2: 300, stroke: 'black', 'stroke-width': 4}}, 
            {type: 'line', attrs: {x1: 300, y1: 230, x2: 250, y2: 270, stroke: 'black', 'stroke-width': 4}}, 
            {type: 'line', attrs: {x1: 300, y1: 230, x2: 350, y2: 270, stroke: 'black', 'stroke-width': 4}}, 
            {type: 'line', attrs: {x1: 300, y1: 300, x2: 250, y2: 350, stroke: 'black', 'stroke-width': 4}}, 
            {type: 'line', attrs: {x1: 300, y1: 300, x2: 350, y2: 350, stroke: 'black', 'stroke-width': 4}}, 
        ];
    
        for (let i = 0; i < partNumber; i++) {
            let part = document.createElementNS(svgns, hangmanParts[i].type);
            for (let attr in hangmanParts[i].attrs) {
                part.setAttribute(attr, hangmanParts[i].attrs[attr]);
            }
            svg.appendChild(part);
        }
        
        $('#hangman-drawing').append(svg);
    }
    
    

});