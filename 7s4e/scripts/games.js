/* Script for 7s4e.org/games, last updated 28 July 2023.

    Table of Contents                                                    Line #
    ---------------------------------------------------------------------------
    Object declaration ..................................................   33

    Functions
        startGame() .....................................................   43
            fetchWord() .................................................   51

        displayGame() ...................................................   70
            newElement() ................................................   77
            displayRows() ...............................................   97
            displayColumns() ............................................  110
            initializeKeyboard() ........................................  123

        playGame() ......................................................  146
            getID() .....................................................  153
            activateElement() ...........................................  165
            listen() ....................................................  179
            writeInput() ................................................  203
            deleteLast() ................................................  213
            awaitSubmission() ...........................................  224
            readGuess() .................................................  241
            evaluate() ..................................................  260
            determineStatus() ...........................................  284
            updateClass() ...............................................  298
            gameOver() ..................................................  312

        endGame() .......................................................  327
*/

const game = {
    active: {round: 0, letter: 0},
    dimensions: {width: 5, height: 6},
    elements: {
        gameRows: document.getElementById("game-rows"),
        selection: document.getElementById("selection"),
        wrapper: document.getElementById("game-wrapper")
    }
};

async function startGame() {
    /* Initiates game by fetching random word and calling function to draw 
     *   game. The function is asynchromous to accommodate the fetchWord()
     *   function.
     * Parameters: none
     * Return: none
     */

    async function fetchWord() {
        /* Asynchronously fetches random word from Vercel API.
         *   https://vercel.com/legal/termsInitiates
         * Parameters: none
         * Return: none
         */
        const url = "https://random-word-api.vercel.app/api?words=1&length=5";
        let response = await fetch(url);
        if (response.ok) {
            let array = await response.json();
            let word = array[0];
            let answer = word.split("");
            return answer;
        } else {alert("Failed to fetch response from random word API.");}
    }
    game.answer = await fetchWord();
    displayGame();
}

function displayGame() {
    /* Displays game space by putting inner HTML into the #game-rows element
     *   and assigning attributes to the virtual keyboard elements.
     * Parameters: none
     * Return: none
     */
    
    function newElement(label, counter, parent, inherit_parent_id=true) {
        /* Called by displayRows() and displayColumns() functions to create the
         *   div elements and their attributes to create the rows of letter 
         *   boxes.
         * Parameters:
         *   label - assigned to the ID of the new HTML element
         *   counter - concatenated with label to produce unique IDs
         *   parent - container for the new HTML element
         *   inherit_parent_id - includes parent ID in concatenation, if true
         * Return: HTML div element with ID assigned
         */
        let element = document.createElement("div");
        let id = label[0].concat(counter.toString());
        if (inherit_parent_id) {element.id = parent.id.concat(id);}
        else {element.id = id;}
        element.classList.add(label);
        parent.appendChild(element);
        return element;
    }

    function displayRows(parent) {
        /* Creates div container for each row of letter boxes by calling the 
         *   newElement() function.
         * Parameters: parent, the section element in games.html with ID 
         *   "game-rows".
         * Return: none
         */
        for (i = 0; i < game.dimensions.height; i++) {
            let rowElement = newElement("round", i, parent, false);
            displayColumns(rowElement);
        }
    }

    function displayColumns(parent) {
        /* Creates div container for each letter box by calling the 
         *   newElement() function.
         * Parameters: parent, the div container created by the displayRows()
         *   function
         * Return: none
         */
        for (j = 0; j < game.dimensions.width; j++) {
            let columnElement = newElement("letter", j, parent, true);
            columnElement.classList.add("unused")
        }
    }

    function initializeKeyboard() {
        /* Loops through ASCII character codes to assign event codes and
         *   classes to the keys in the virtual keyboard.
         * Parameters: none
         * Return: none
         */
        game.keyCodes = [];
        for (i = 65; i <= 90; i++) {
            let eventCode = "Key".concat(String.fromCharCode(i));
            game.keyCodes.push(eventCode)
        }
        for (i = 97; i <= 122; i++) {
            let keyElement = document.getElementById(String.fromCharCode(i));
            keyElement.removeAttribute("class");
            keyElement.classList.add("keys", "unused");
        }
    }
    game.elements.gameRows.innerHTML = "";
    displayRows(game.elements.gameRows);
    initializeKeyboard();
    playGame();
}

function playGame() {
    /* Activates elements and calls all functions necessary for runtime 
     *   operation of the game.
     * Parameters: none
     * Return: none
     */
    
    function getId() {
        /* Creates HTML IDs by concatenating counters tracked in the game 
         *   object.
         * Parameters: none
         * Return: HTML ID tag
         */
        let id =
            "r" + game.active.round.toString() +
            "l" + game.active.letter.toString();
        return id;
    }

    function activateElement() {
        /* Calls the listen() function to receive letters for the active box, 
         *   or the awaitSubmission() function to receive a completed guess for
         *   the active round.
         * Parameters: none
         * Return: none
         */
        if (game.active.letter < game.dimensions.width) {
            let activeId = getId();
            game.active.element = document.getElementById(activeId);
            listen();
        } else {awaitSubmission();}
    }

    function listen() {
        /* Adds event listener for keyboard input. Expected keystrokes include
         *   letters and the Backspace key. Presses of the Shift keys are
         *   ignored. All other keys trigger an alert.
         * Parameters: none
         * Return: none
         */
        document.addEventListener("keydown", (event) => {
            if (game.keyCodes.includes(event.code)) {writeInput(event);}
            else if (event.code == "Backspace") {
                if (game.active.letter > 0) {deleteLast();}
                else {listen();}
            } else if (event.code == "ShiftLeft" || event.code == "ShiftRight") {
                listen()
            }
            else {
                alert(
                    "Please type letters, Backspace to undo, or Enter to submit complete word."
                );
                listen();
            }
        }, {once: true});
    }
    
    function writeInput(event) {
        /* Puts an uppercase letter in the active letter box.
         * Parameters: keydown event on A-Z
         * Return: none
         */
        game.active.element.innerHTML = `${event.key.toUpperCase()}`;
        game.active.letter++;
        activateElement();
    }

    function deleteLast() {
        /* Deletes the letter in the previously active letter box.
         * Parameters: keydown event on Backspace
         * Return: none
         */
        game.active.letter--;
        let targetId = getId();
        document.getElementById(targetId).innerHTML = "";
        activateElement();
    }

    function awaitSubmission() {
        /* Adds event listener when all letter boxes are filled for each round.
         *   Expected keystrokes are Enter and Backspace.
         * Parameters: none
         * Return: none
         */
        document.addEventListener("keydown", (event) => {
            if (event.code == "Enter" || event.code == "NumpadEnter") {
                readGuess();
            } else if (event.code == "Backspace") {deleteLast();}
            else {
                alert("Please press Enter to submit, or Backspace to modify.");
                awaitSubmission();
            }
        }, {once: true});
    }

    function readGuess() {
        /* Gets guessed letters upon Enter keydown event.
         * Parameters: none
         * Return: array of the guessed letters
         */
        let guess = [];
        for (
            game.active.letter = 0;
            game.active.letter < game.dimensions.width;
            game.active.letter++
        ) {
            let letterId = getId();
            let letter = 
                document.getElementById(letterId).innerText.toLowerCase();
            guess.push(letter);
        }
        evaluate(guess);
    }

    function evaluate(guess) {
        /* Loops through array of guessed letters, calling functions to score
         *   the results and, as necessary, end the game.
         * Parameters: array of guessed letters
         * Return: none
         */
        game.score = 0;
        for (
            game.active.letter = 0;
            game.active.letter < game.dimensions.width;
            game.active.letter++
        ) {
            let status = determineStatus(guess);
            updateClass(status);
            if (status === "match") {game.score++}
        }
        game.active.round++
        if (gameOver(game.score)) {endgame();}
        else {
            game.active.letter = 0;
            activateElement();
        }
    }

    function determineStatus(guess) {
        /* For each guessed letter, determines whether the letter is a match
         *   and, if not, whether the letter is or is not in the hidden word.
         * Parameters: array of guessed letters
         * Return: status of letter under active evaluation
         */
        let i = game.active.letter;
        let status;
        if (guess[i] === game.answer[i]) {status = "match";}
        else if (game.answer.includes(guess[i])) {status = "within";}
        else {status = "used";}
        return status;
    }

    function updateClass(status) {
        /* For each evaluated letter, assigns appropriate class to both the
         *   letter box and virtual key elements.
         * Parameters: match, within, or previously used status
         * Return: none
         */
        let boxId = getId();
        let boxElement = document.getElementById(boxId);
        boxElement.classList.add(status);
        let letterId = boxElement.innerText.toLowerCase();
        let keyElement = document.getElementById(letterId);
        keyElement.classList.add(status);
    }

    function gameOver(score) {
        /* Ends the game, with a win all the letters are correct in a round, or
         *   a loss if all rounds are used without a correct answer.
         * Parameters: score, a count of the correct letters
         * Return: boolean, true if win, false if not
         */
        if (score === game.dimensions.width) {game.win = true;}
        else if (game.active.round === game.dimensions.height) {
            game.win = false;
        } else {return false;}
        return true;
    }
    activateElement();
}

function endgame() {
    /* Assigns win/lose class to the HTML element containing the game.
     * Parameters: none
     * Return: none
     */
    if (game.win) {game.elements.wrapper.classList.add("win");}
    else {game.elements.wrapper.classList.add("lose");}
}

startGame();
