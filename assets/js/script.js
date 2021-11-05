let userSquares = [];
let computerSquares = [];

/**
 * Receive click id and start the game turn 
 */
function playerClick(square){
    //Check if player's turn
    if (document.getElementById("game-turn").innerHTML === "Your"){
        //Check if square is taken
        if (squareFree(square)) {
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
    return ;
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
function checkWinner() {
    
}

/**
 * Change score if someone wins or draws
 */
function setScoreboard() {
    
}

/**
 * Show who's turn it is
 * Tell computer to take a turn
 */
function changePlayer(OX) {
    if (OX === "O"){
        document.getElementById("game-turn").innerHTML = "Computer's";
        computerTurn(); // Tell computer to take it's turn
    } else {
        document.getElementById("game-turn").innerHTML = "Your";
    }
}

/**
 * Find a free square to place Computer's X in
 * short delay to simulate the computer thinking
 */
function computerTurn() {
    
}