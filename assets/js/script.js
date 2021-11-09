/*jshint esversion: 6 */

//Set global variable winner to a default falsey state
let winner = false;

//Set global variable hardMode to a default truthy state
//hardMode gives the user a more challenging game
//If hardMode is false the computer chooses a free square at random
let hardMode = true;

//Set global variable beastMode to a falsey state
//beastMode adds another level of intelligence to the computer
let beastMode = false;

/**
 * Receive click id and start the game turn 
 */
function playerClick(square){
    //Check if player's turn
    if (document.getElementById("game-turn").innerHTML === "Your"){

        //Check if square is taken
        if (squareFree(square)) {

            //Set the square in the game
            setSquare(`${square}`,"O");

        } else {
            //Square already taken
            shakey();
        }
    } else {
        //It's not the player's turn!
        shakey();
    }
}

/**
 * Check if square is free
 */
function squareFree(square) {
    return (document.getElementById(`square-${square}`).innerHTML === '') ? true : false ;
}

/**
 * Add the O or X to the game board
 */
function setSquare(square, OX) {
    document.getElementById(`square-${square}`).innerHTML = `${OX}`;

    // Change the active player
    changePlayer(OX); 
}

/**
 * Check if there's 3 lines or if all squares are filled
 */
function checkWinner(OX) {
    //Winning Squares are:
    let winNumsArray = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];

    //Declare array for player's squares
    let squareArray = [];

    //Squares with active O or X will be added to player's squares array
    for (let i = 1; i <= 9; i++) {
        if (document.getElementById(`square-${i}`).innerHTML === OX) {
            squareArray.push(i);
        }
    }
    //Loop through the winning squares to check against player squares
    let i = 0;
    while (i < winNumsArray.length) {
        if (winNumsArray[i].every((val) => squareArray.includes(val))) {
            //Winner!
            winner = true;
            break;
        }
        i++;
    }
    if (winner){
        //Increments the scoreboard
        setScoreboard(true, OX);

        // Declares the winner! And resets the game
        if (OX === "O"){
            //Show some winning colours!
            winnerAnimation();

            //Winner message!
            modalBox("WINNER!");

        } else {
            //Show the losing colour
            loserAnimation();

            //Loser message
            modalBox("Loser");
        }
        setTimeout(() => {resetSquares();}, 1500);
        
        //Changes global winner variable back to false
        winner = false;
    } else if (OX === "O"){
        //If no winner and it's the computer's turn
        computerTurn();
    }
}

/**
 * Change score if someone wins or draws
 */
function setScoreboard(win, OX) {
    if (win) {
        //Change the score based on who is the active player
        if (OX === "O"){
            document.getElementById("human-score").innerHTML++;
        } else {
            document.getElementById("computer-score").innerHTML++;
        }
    } else {
        //Increments the draw-score if nobody won
        document.getElementById("draw-score").innerHTML++;
    }
}

/**
 * Show who's turn it is and check if there's a winner
 */
function changePlayer(OX) {
    if (OX === "O"){
        document.getElementById("game-turn").innerHTML = "Computer's";
    } else {
        document.getElementById("game-turn").innerHTML = "Your";
    }
    //Check if there's a winner
    checkWinner(OX); 
}

/**
 * Find a free square to place Computer's X in
 * short delay to simulate the computer thinking
 */
 function computerTurn() {
    //Double check it's computer's turn
    if (document.getElementById("game-turn").innerHTML === "Computer's") {
        //Find a free square
        //Declare array for squares
        let squareArray = [];

        //Squares with active O or X will not be added to the array
        //Loop through squares from 1-9.
        for (let i = 1; i <= 9; i++) {
            if (document.getElementById(`square-${i}`).innerHTML === ''){
                squareArray.push(i);
            }
        }
        //Check if all squares are full or not
        if (squareArray.length < 1 && !winner) {
            //If no winner, reset game and increment draw-score
            setTimeout(() => {resetSquares();}, 1000);
            setScoreboard(false);

            //Show draw colour
            drawAnimation();

            //Draw message
            modalBox("Draw");
        } else {
            //Assign a free square based on difficulty level
            let chosenSquare = (hardMode) ? computerSquareHard(squareArray) : computerSquareEasy(squareArray);

            //Wait 0.75 seconds then add X to the square
            setTimeout(() => {setSquare(chosenSquare, "X");}, 750);
        }
    } else {
        console.log("Error, It's not the computer's turn?");
    }
}

/**
 * Resets the game to play again
 */
function resetSquares() {
    for (let i = 1; i <= 9; i++) {

        //Resets all game squares to empty
        document.getElementById(`square-${i}`).innerHTML = '';
    }
    //Resets who's turn it is
    document.getElementById("game-turn").innerHTML = "Your";

    //Shakey!
    shakey();

    //Change background back to normal
    document.body.style.backgroundColor = "darkslategray";
}

/**
 * Chooses a square based on logic
 */
function computerSquareHard(squareArray){
    //Declare variable for upcoming beast slaying
    let activateTheBeast;

    //Do we activate THE BEAST? If not activated we'll continue in hard mode
    if (beastMode){
        activateTheBeast = activateBeast();
    } else {
        activateTheBeast = 0;
    }
    if (activateTheBeast === 0){

        //If meets criteria choose hard else computerSquareEasy(squareArray)
        //Check if 2 or more squares are available, else computerSquareEasy(squareArray)
        if (squareArray.length > 1){

            //Elegible Squares are:
            let eligibleNumsArray = [[1,2],[2,3],[1,3],[4,5],[5,6],[4,6],
                                    [7,8],[8,9],[7,9],[1,4],[4,7],[1,7],
                                    [2,5],[5,8],[2,8],[3,6],[6,9],[3,9],
                                    [1,5],[5,9],[1,9],[3,5],[5,7],[3,7]];

            //Declare array for player's squares
            let playerArray = [];

            //Squares with active O will be added to player's squares array
            for (let i = 1; i <= 9; i++) {
                if (document.getElementById(`square-${i}`).innerHTML === "O"){
                    playerArray.push(i);
                }
            }
            //Declare the variable to return
            let cSquare = computerSquareEasy(squareArray);

            //Loop through the winning squares to check against player squares
            for (let i = 0; i < eligibleNumsArray.length; i++) {

                //Checks if player squares match with elegible squares
                if (eligibleNumsArray[i].every((val) => playerArray.includes(val))) {
                    
                    let arrStr = eligibleNumsArray[i].toString();

                    //Check if there's free squares next to the eligible lines
                    if (arrStr === "1,2" && squareFree(3)){
                        cSquare = 3;
                    } else if (arrStr === "2,3" && squareFree(1)){
                        cSquare = 1;
                    } else if (arrStr === "1,3" && squareFree(2)){
                        cSquare = 2;
                    } else if (arrStr === "4,5" && squareFree(6)){
                        cSquare = 6;
                    } else if (arrStr === "5,6" && squareFree(4)){
                        cSquare = 4;
                    } else if (arrStr === "4,6" && squareFree(5)){
                        cSquare = 5;
                    } else if (arrStr === "7,8" && squareFree(9)){
                        cSquare = 9;
                    } else if (arrStr === "8,9" && squareFree(7)){
                        cSquare = 7;
                    } else if (arrStr === "7,9" && squareFree(8)){
                        cSquare = 8;
                    } else if (arrStr === "1,4" && squareFree(7)){
                        cSquare = 7;
                    } else if (arrStr === "4,7" && squareFree(1)){
                        cSquare = 1;
                    } else if (arrStr === "1,7" && squareFree(4)){
                        cSquare = 4;
                    } else if (arrStr === "2,5" && squareFree(8)){
                        cSquare = 8;
                    } else if (arrStr === "5,8" && squareFree(2)){
                        cSquare = 2;
                    } else if (arrStr === "2,8" && squareFree(5)){
                        cSquare = 5;
                    } else if (arrStr === "3,6" && squareFree(9)){
                        cSquare = 9;
                    } else if (arrStr === "6,9" && squareFree(3)){
                        cSquare = 3;
                    } else if (arrStr === "3,9" && squareFree(6)){
                        cSquare = 6;
                    } else if (arrStr === "1,5" && squareFree(9)){
                        cSquare = 9;
                    } else if (arrStr === "5,9" && squareFree(1)){
                        cSquare = 1;
                    } else if (arrStr === "1,9" && squareFree(5)){
                        cSquare = 5;
                    } else if (arrStr === "3,5" && squareFree(7)){
                        cSquare = 7;
                    } else if (arrStr === "5,7" && squareFree(3)){
                        cSquare = 3;
                    } else if (arrStr === "3,7" && squareFree(5)){
                        cSquare = 5;
                    }
                }
            }
            //Return the square
            return cSquare;
        } else {
            //Less than 2 squares left so just do the easy logic
            return computerSquareEasy(squareArray);
        }
    } else {
        //Return THE BEAST's choice of number
        return activateTheBeast;
    }
}

/**
 * Chooses a square randomly
 */
 function computerSquareEasy(squareArray){
    //Choose square at random and return the square number
    return squareArray[Math.floor(Math.random() * squareArray.length)];
}

/**
 * Resets player scores when they toggle hard mode
 */
function resetScores(){
    document.getElementById("draw-score").innerHTML = 0;
    document.getElementById("human-score").innerHTML = 0;
    document.getElementById("computer-score").innerHTML = 0;

    //Reset the board
    resetSquares();
}

//Check page is loaded
window.addEventListener('load', function () {

    //Define modeSwitch and listen for click event
    let modeSwitch = this.document.querySelectorAll('#hard-switch');
    modeSwitch.forEach(function(clicked) {

        //Add the event listener
        clicked.addEventListener("click", function() {

            //Check current mode, switch it around and reset scores
            if (document.getElementById("hard-mode").innerHTML === "ON"){
                beastMode = true;
                document.getElementById("hard-mode").innerHTML = "BEAST!";
                resetScores();
            } else if (document.getElementById("hard-mode").innerHTML === "BEAST!"){
                hardMode = false;
                beastMode = false;
                document.getElementById("hard-mode").innerHTML = "OFF";
                resetScores();
            } else{
                hardMode = true;
                document.getElementById("hard-mode").innerHTML = "ON";
                resetScores();
            }
        });
    });

    //Below code to listen for click events was originally provided by 
    //my mentor although I have modified it slightly and added
    //comments so that I can look back and know what it's doing.

    //Define boardSquares and listen for click event
    let boardSquares = this.document.querySelectorAll('.game-square');
    boardSquares.forEach(function(clicked) {

        //Add the event listener
        clicked.addEventListener("click", function() {

            //Get the square number
            const selectedSquare = this.getAttribute('data-square-number');

            //Start the game loop
            playerClick(selectedSquare);
        });
    });
});

/**
 * Shakes the game board by adding a css animation class
 * then removes the class so that the animation can be applied again
 */
function shakey(){
    let shake = document.getElementById("game-container");
    shake.classList.add("shake-up");
    setTimeout(() => {shake.classList.remove("shake-up");}, 600);
}

/**
 * Shows the losing colour
 */
function loserAnimation(){
    //Turn background red
    document.body.style.backgroundColor = "red";
}

/**
 * Shows the neutral colour
 */
function drawAnimation(){
    //Turn backgroud black
    document.body.style.backgroundColor = "black";
}

/**
 * Shows the winning colours!
 */
function winnerAnimation(){
    //Winner! Celebrate with some party colours!
    const colours = ["#FE53BB", "#09FBD3", "#F5D300", "#7122FA", "#B76CFD", 
                     "#FF2281", "#011FFD", "#FDC7D7", "#E8E500", "#00FFCA", 
                     "#33135C", "#FF9472", "#35212A", "#FE63B5", "darkslategray"];
    let i = 0;

    function change() {
        //If we have run out of colours, stop the timer
        if(i >= colours.length){ clearInterval(timer); }
        
        //Set the colour and increment the index
        document.body.style.backgroundColor = colours[i++];
    }
    //Start the timer but get a reference to it so we can stop it later
    const timer = setInterval(change, 70); 
}

//Below I got the orginal code from 
//https://www.w3schools.com/howto/howto_css_modals.asp
//then I've edited to work with my code and fit my needs

/**
 * Display the modal box
 */
function modalBox(message){
    //Change the modal text content
    document.getElementById("modal-text").innerHTML = message;

    //Get the modal
    var modal = document.getElementById("myModal");

    //Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    //Open the modal 
    modal.style.display = "block";

    //Close the modal after 1.5 seconds
    setTimeout(() => {modal.style.display = "none";}, 1500);

    //When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    };
    //When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}

/**
 * Adds an increased level of intelligence to the computer
 * Beast mode activated.
 */
function activateBeast(){
    //Elegible Squares are:
    let eligibleNumsArray = [[1,2],[2,3],[1,3],[4,5],[5,6],[4,6],
                             [7,8],[8,9],[7,9],[1,4],[4,7],[1,7],
                             [2,5],[5,8],[2,8],[3,6],[6,9],[3,9],
                             [1,5],[5,9],[1,9],[3,5],[5,7],[3,7]];

    //Declare array for computer's squares
    let computerArray = [];

    //Squares with active X will be added to computer's squares array
    for (let i = 1; i <= 9; i++) {
        if (document.getElementById(`square-${i}`).innerHTML === "X"){
            computerArray.push(i);
        }
    }
    //Declare the variable with default value to return
    let cSquare = 0;

    //Loop through the winning squares to check against computer's squares
    for (let i = 0; i < eligibleNumsArray.length; i++) {

    //Checks if computer's squares match with elegible squares
        if (eligibleNumsArray[i].every((val) => computerArray.includes(val))) {
            let arrStr = eligibleNumsArray[i].toString();
            
            //Check if there's free squares next to the eligible lines
            if (arrStr === "1,2" && squareFree(3)){
                cSquare = 3;
            } else if (arrStr === "2,3" && squareFree(1)){
                cSquare = 1;
            } else if (arrStr === "1,3" && squareFree(2)){
                cSquare = 2;
            } else if (arrStr === "4,5" && squareFree(6)){
                cSquare = 6;
            } else if (arrStr === "5,6" && squareFree(4)){
                cSquare = 4;
            } else if (arrStr === "4,6" && squareFree(5)){
                cSquare = 5;
            } else if (arrStr === "7,8" && squareFree(9)){
                cSquare = 9;
            } else if (arrStr === "8,9" && squareFree(7)){
                cSquare = 7;
            } else if (arrStr === "7,9" && squareFree(8)){
                cSquare = 8;
            } else if (arrStr === "1,4" && squareFree(7)){
                cSquare = 7;
            } else if (arrStr === "4,7" && squareFree(1)){
                cSquare = 1;
            } else if (arrStr === "1,7" && squareFree(4)){
                cSquare = 4;
            } else if (arrStr === "2,5" && squareFree(8)){
                cSquare = 8;
            } else if (arrStr === "5,8" && squareFree(2)){
                cSquare = 2;
            } else if (arrStr === "2,8" && squareFree(5)){
                cSquare = 5;
            } else if (arrStr === "3,6" && squareFree(9)){
                cSquare = 9;
            } else if (arrStr === "6,9" && squareFree(3)){
                cSquare = 3;
            } else if (arrStr === "3,9" && squareFree(6)){
                cSquare = 6;
            } else if (arrStr === "1,5" && squareFree(9)){
                cSquare = 9;
            } else if (arrStr === "5,9" && squareFree(1)){
                cSquare = 1;
            } else if (arrStr === "1,9" && squareFree(5)){
                cSquare = 5;
            } else if (arrStr === "3,5" && squareFree(7)){
                cSquare = 7;
            } else if (arrStr === "5,7" && squareFree(3)){
                cSquare = 3;
            } else if (arrStr === "3,7" && squareFree(5)){
                cSquare = 5;
            }
        }
    }
    //Return the square
    return cSquare;
}