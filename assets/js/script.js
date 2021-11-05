//Set global variable winner to a default falsey state
var winner = false;

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
            alert("Square already taken!");
        }
    } else {
        //It's not the player's turn!
        alert("Wait your turn!");
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
    changePlayer(OX); // Change the active player
}

/**
 * Check if there's 3 lines or if all squares are filled
 */
function checkWinner(OX) {
    //Winning Squares are:
    let winNumsArray = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];

    //Declare array for player's squares
    let squareArray = [];

    //Squares with active O or X will be added to the array
    for (let i = 1; i <= 9; i++) {
        (document.getElementById(`square-${i}`).innerHTML === OX) ? squareArray.push(i) : '' ;
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
        setTimeout(() => {alert("WE HAVE A WINNER! Game will reset :D")}, 100);
        setTimeout(() => {resetSquares()}, 2000);

    }
}

/**
 * Change score if someone wins or draws
 */
function setScoreboard(win, OX) {
    if (win) {
        //Change the score based on who is the active player
        (OX === "O") ? document.getElementById("human-score").innerHTML++ : document.getElementById("computer-score").innerHTML++ ;
    } else {
        //Increments the draw-score if nobody won
        document.getElementById("draw-score").innerHTML++;
    }
}

/**
 * Show who's turn it is
 * Tell computer to take a turn
 */
function changePlayer(OX) {
    //Check if there's a winner before changing player
    checkWinner(OX); 

    if (OX === "O"){
        document.getElementById("game-turn").innerHTML = "Computer's";
        computerTurn();
    } else {
        document.getElementById("game-turn").innerHTML = "Your";
    }
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
        for (let i = 1; i <= 9; i++) {
            (document.getElementById(`square-${i}`).innerHTML === '') ? squareArray.push(i) : '' ;
        }

        //Choose square at random
        square = Math.floor(Math.random() * squareArray.length);

        if (squareArray.length < 1 && !winner) {
            setTimeout(() => {alert("No winner this time :( Game will reset.")}, 100);
            setTimeout(() => {resetSquares()}, 2000);
            setScoreboard(false);
        } else {
            //Wait 1 second then add X to the square
            setTimeout(() => {setSquare(squareArray[square], "X")}, 1000);
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
        //Resets who's turn it is
        document.getElementById("game-turn").innerHTML = "Your";

        //Resets all game squares to empty
        document.getElementById(`square-${i}`).innerHTML = '';
    }
    //Changes global variable back to false
    winner = false;
}