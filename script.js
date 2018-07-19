// Connect Four

let redTurn = true;
let board = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
]

function checkWin(cellRow, cellColumn) {

    //Checking for horizontal wins on row which triggered event
    for (let item in board[cellRow]) {
        item = Number(item);
        let cell = board[cellRow][item];
        if (cell != 0 && cell === board[cellRow][item + 1] && cell === board[cellRow][item + 2] && cell === board[cellRow][item + 3]) {
            return true;
        }
    }

    //Checking for vertical wins on the column which triggered event
    for (let j = 0; j <= 2; j++) {
        item = Number(j);
        let cell = board[item][cellColumn];
        if (cell != 0 && cell === board[item + 1][cellColumn] && cell === board[item + 2][cellColumn] && cell === board[item + 3][cellColumn]) {
            return true;
        }
    }

    //Checking for downwards right diagonal wins across the whole board because IDK how to only check part of the board
    for (let i = 0; i <= 2; i++) {
        for (let j = 0; j <= 3; j++) {
            let cell = board[i][j];
            if (cell != 0 && cell === board[i + 1][j + 1] && cell === board[i + 2][j + 2] && cell === board[i + 3][j + 3]) {
                return true;
            }
        }
    }

    //Checking for downwards left diagonal wins across the whole board because IDK how to only check part of the board
    for (let i = 0; i <= 2; i++) {
        for (let j = 3; j <= 6; j++) {
            let cell = board[i][j];
            if (cell != 0 && cell === board[i + 1][j - 1] && cell === board[i + 2][j - 2] && cell === board[i + 3][j - 3]) {
                return true;
            }
        }
    }
}

function checkTie() {
    let sum = 0;
    for (let item in board[0]) {
        if (board[0][item] === 0) {
            sum = 0;
            return false;
        } else {
            sum++
        }
    }
    if (sum >= 7) {
        return true;
    }
}

function getWinningPlayer() {
    if (redTurn) {
        return "Red";
    } else {
        return "Black";
    }
}

handleClick = function (event) {

    //Getting the id and DOM element for the cell which triggered the event listener
    let cellClickedId = event.target.id.split(",");
    let cellClickedElement = document.getElementById(cellClickedId);
    let cellRow = Number(cellClickedId[0]);
    let cellColumn = Number(cellClickedId[1]);

    //Checking the selected space to ensure it is valid
    // The space is valid if the space is empty and if the space is on the bottom row of the table or if the space directly below it is not empty.
    if (board[cellRow][cellColumn] != 0 || cellRow <= 4 && (board[(cellRow + 1)][cellColumn]) == 0) {
        alert("Select a valid space!");
        return;
    }

    //Adding the checker
    if (redTurn) {
        cellClickedElement.className = ('red');
        board[cellRow][cellColumn] = 1;
    } else {
        cellClickedElement.className = ('black');
        board[cellRow][cellColumn] = 2;
    }

    //Checking if someone won or if there is a tie. If so the game stops and resets. If not the player switches.
    if (checkWin(cellRow, cellColumn)) {
        let winningPlayer = getWinningPlayer();
        alert("Player " + winningPlayer + " has won!!!");
        board = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]
        ]
        redTurn = true;
        winningPlayer = "";
        let cells = document.querySelectorAll("td");
        for (let i = 0; i < cells.length; i++) {
            cells[i].className = ('blank');
        }


    } else if (checkTie()) {
        alert("This is a tie. Congratulations on both being losers.");
        board = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]
        ]
        redTurn = true;
        winningPlayer = "";
        let cells = document.querySelectorAll("td");
        for (let i = 0; i < cells.length; i++) {
            cells[i].className = ('blank');
        }

    } else {
        redTurn = !redTurn;
    }
}

//Adding Event Listeners
let cells = document.querySelectorAll("td");
for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', handleClick);
}


// Rock Paper Scissors

const wonTag = document.getElementById("whoWon");
const computerImg = document.getElementById("computerImg");
let userScore = 0;
let compScore = 0;
const rockButton = document.getElementById("rockButton");
const paperButton = document.getElementById("paperButton");
const scissorsButton = document.getElementById("scissorsButton");
rockButton.onclick = function () {
    runGame(0);
}
paperButton.onclick = function () {
    runGame(1);
}
scissorsButton.onclick = function () {
    runGame(2);
}

function runGame(userPlay) {
    let computerPlay = getRandomInt(0, 3);
    computerImageSwitch(computerPlay);
    let winner = checkWinnerRPC(userPlay, computerPlay);
    if (winner == "user") {
        userScore++;
        userScore_label.textContent = userScore;
        //alert("The winner is the User!");
        wonTag.textContent = ("The User won this round!")
    } else if (winner == "comp") {
        compScore++;
        compScore_label.textContent = compScore;
        //alert("The winner is the Computer :,(");
        wonTag.textContent = ("The Computer won this round :,(")
    } else if (winner == "tie") {
        //alert("The game is a tie!")
        wonTag.textContent = ("This round is a tie.")
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function checkWinnerRPC(user, comp) {
    if (user == comp) {
        return ("tie");
    } else if (user == 0 && comp == 2) {
        return ("user");
    } else if (user == 1 && comp == 0) {
        return ("user");
    } else if (user == 2 && comp == 1) {
        return ("user");
    } else if (comp == 0 && user == 2) {
        return ("comp");
    } else if (comp == 1 && user == 0) {
        return ("comp");
    } else if (comp == 2 && user == 1) {
        return ("comp")
    }
}

function computerImageSwitch(pick) {
    if (pick == 0) {
        computerImg.setAttribute("src", "rock.png")
    } else if (pick == 1) {
        computerImg.setAttribute("src", "paper.png")
    } else if (pick == 2) {
        computerImg.setAttribute("src", "scissors.png")
    }
}