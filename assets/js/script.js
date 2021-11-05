
/**
 * Receive click id and start the game turn 
 */
function playerClick(square){
    let gameTurn = document.getElementById("game-turn").innerHTML;
    if (gameTurn === "Your"){
        setSquare(`${square}`,"O");
    } else {
        alert("Wait your turn!");
    }
}

/**
 * Add the O or X to the game board
 */
function setSquare(square, OX) {
    document.getElementById(`${square}`).innerHTML = `${OX}`;
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