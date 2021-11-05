document.getElementById("square-1").addEventListener("click", function() {
    if (document.getElementById("game-turn").innerHTML === "Your"){
        setSquare("1","O");
    }
});

/**
 * Add the X or O to the game board
 */
function setSquare(square, OX) {
    document.getElementById(`square-${square}`).innerHTML = `${OX}`;
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
 * Show who's turn it is, short delay to simulate the computer thinking
 */
function changePlayer() {
    
}

/**
 * Find a free square to place Computer's X in
 */
function computerTurn() {
    
}