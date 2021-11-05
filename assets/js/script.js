
/**
 * Receive click id and start the game turn 
 */
function playerClick(square){
    //Check if player's turn
    if (document.getElementById("game-turn").innerHTML === "Your"){
        //Check if square is taken
        if (squareFree(square)) {
            //Add square number to userSquares array and set the square in the game
            //userSquares.push(square);
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
            alert("WE HAVE A WINNER!");
            console.log("Winner!");
            break;
        } else {
            console.log("No winner yet :(");
        }
        i++;
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