//Set global variable winner to a default falsey state
let winner = false;

//Set global variable hardMode to a default truthy state
//hardMode gives the user a more challenging game
//If hardMode is false the computer chooses a free square at random
let hardMode = true;

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

        //Changes global variable back to false
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
        (OX === "O") ? document.getElementById("human-score").innerHTML++ : document.getElementById("computer-score").innerHTML++ ;
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
            (document.getElementById(`square-${i}`).innerHTML === '') ? squareArray.push(i) : '' ;
        }

        //Check if all squares are full or not
        if (squareArray.length < 1 && !winner) {

            //Alert if no winner, reset game and increment draw-score
            setTimeout(() => {alert("No winner this time :( Game will reset.")}, 100);
            setTimeout(() => {resetSquares()}, 2000);
            setScoreboard(false);
        } else {

            //Assign a free square based on difficulty level
            let chosenSquare = (hardMode) ? computerSquareHard(squareArray) : computerSquareEasy(squareArray);

            //Wait 0.75 seconds then add X to the square
            setTimeout(() => {setSquare(chosenSquare, "X")}, 750);
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
}

/**
 * Chooses a square based on logic
 */
function computerSquareHard(squareArray){
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
            (document.getElementById(`square-${i}`).innerHTML === "O") ? playerArray.push(i) : '' ;
        }

        //Declare the variable to return
        let cSquare = computerSquareEasy(squareArray);

        //Loop through the winning squares to check against player squares
        for (let i = 0; i < eligibleNumsArray.length; i++) {

            //Checks if player squares match with elegible squares
            if (eligibleNumsArray[i].every((val) => playerArray.includes(val))) {
                
                let arrStr = eligibleNumsArray[i].toString();

                //Check if there's free squares next to the eligible lines
                if (arrStr === "1,2" && document.getElementById("square-3").innerHTML === ""){
                    cSquare = 3;
                } else if (arrStr === "2,3" && document.getElementById("square-1").innerHTML === ""){
                    cSquare = 1;
                } else if (arrStr === "1,3" && document.getElementById("square-2").innerHTML === ""){
                    cSquare = 2;
                } else if (arrStr === "4,5" && document.getElementById("square-6").innerHTML === ""){
                    cSquare = 6;
                } else if (arrStr === "5,6" && document.getElementById("square-4").innerHTML === ""){
                    cSquare = 4;
                } else if (arrStr === "4,6" && document.getElementById("square-5").innerHTML === ""){
                    cSquare = 5;
                } else if (arrStr === "7,8" && document.getElementById("square-9").innerHTML === ""){
                    cSquare = 9;
                } else if (arrStr === "8,9" && document.getElementById("square-7").innerHTML === ""){
                    cSquare = 7;
                } else if (arrStr === "7,9" && document.getElementById("square-8").innerHTML === ""){
                    cSquare = 8;
                } else if (arrStr === "1,4" && document.getElementById("square-7").innerHTML === ""){
                    cSquare = 7;
                } else if (arrStr === "4,7" && document.getElementById("square-1").innerHTML === ""){
                    cSquare = 1;
                } else if (arrStr === "1,7" && document.getElementById("square-4").innerHTML === ""){
                    cSquare = 4;
                } else if (arrStr === "2,5" && document.getElementById("square-8").innerHTML === ""){
                    cSquare = 8;
                } else if (arrStr === "5,8" && document.getElementById("square-2").innerHTML === ""){
                    cSquare = 2;
                } else if (arrStr === "2,8" && document.getElementById("square-5").innerHTML === ""){
                    cSquare = 5;
                } else if (arrStr === "3,6" && document.getElementById("square-9").innerHTML === ""){
                    cSquare = 9;
                } else if (arrStr === "6,9" && document.getElementById("square-3").innerHTML === ""){
                    cSquare = 3;
                } else if (arrStr === "3,9" && document.getElementById("square-6").innerHTML === ""){
                    cSquare = 6;
                } else if (arrStr === "1,5" && document.getElementById("square-9").innerHTML === ""){
                    cSquare = 9;
                } else if (arrStr === "5,9" && document.getElementById("square-1").innerHTML === ""){
                    cSquare = 1;
                } else if (arrStr === "1,9" && document.getElementById("square-5").innerHTML === ""){
                    cSquare = 5;
                } else if (arrStr === "3,5" && document.getElementById("square-7").innerHTML === ""){
                    cSquare = 7;
                } else if (arrStr === "5,7" && document.getElementById("square-3").innerHTML === ""){
                    cSquare = 3;
                } else if (arrStr === "3,7" && document.getElementById("square-5").innerHTML === ""){
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
}

/**
 * Chooses a square randomly
 */
 function computerSquareEasy(squareArray){

    //Choose square at random and return the square number
    return squareArray[Math.floor(Math.random() * squareArray.length)];
}