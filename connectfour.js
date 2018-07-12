let redTurn = true;
let board = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
]

const location = document.getElementById("connectfour");

function makeTable() {

    //Creating the table
    var newTable = document.createElement('table');
    newTable.id = "table";

    //Iterating through each row in board and creating a tr for it whilst iterating through each item in the row and creating a td for it.
    for (let row in board) {
        let newRow = document.createElement('tr')
        for (let cell in board[row]) {
            let newCell = document.createElement('td');
            newCell.id = [row, cell];
            newCell.className = ('blank');
            newCell.addEventListener('click', handleClick);
            newRow.appendChild(newCell);
        }
        newTable.appendChild(newRow);
    }
    location.appendChild(newTable);
}

function checkWin(cellRow,cellColumn){

    //Checking for horizontal wins on row which triggered event
    for(let item in board[cellRow]){
        item = Number(item);
        let cell = board[cellRow][item];
        if(cell != 0 && cell === board[cellRow][item+1] && cell === board[cellRow][item+2] && cell === board[cellRow][item+3]){
            return true;
        }
    }

    //Checking for vertical wins on the column which triggered event
    for(let j = 0; j <= 2; j++){
        item = Number(j);
        let cell = board[item][cellColumn];
        if(cell != 0 && cell === board[item+1][cellColumn] && cell === board[item+2][cellColumn] && cell === board[item+3][cellColumn]){
            return true;
        }
    }

    //Checking for downwards right diagonal wins across the whole board because IDK how to only check part of the board
    for(let i = 0; i <= 2; i++){
        for(let j = 0; j <=3; j++){
            let cell = board[i][j];
            if(cell != 0 && cell === board[i+1][j+1] && cell === board[i+2][j+2] && cell === board[i+3][j+3]){
                return true;
            }
        }
    }

    //Checking for downwards left diagonal wins across the whole board because IDK how to only check part of the board
    for(let i = 0; i <= 2; i++){
        for(let j = 3; j<= 6; j++){
            let cell = board[i][j];
            if(cell != 0 && cell === board[i+1][j-1] && cell === board[i+2][j-2] && cell === board[i+3][j-3]){
                return true;
            }
        }
    }
}

function checkTie(){
    let sum = 0;
    for(let item in board[0]){
        if(board[0][item] === 0){
            sum = 0;
            return false;
        }else{
            sum++
        }
    }
    if(sum >= 7){
        return true;
    }
}

function getWinningPlayer(){
    if(redTurn){
        return "Red";
    }else{
        return "Black";
    }
}

handleClick = function (event) {

    //Getting the id and DOM element for the cell which triggered the event listener
    let cellClickedId = event.target.id.split(",");
    let cellClickedElement = document.getElementById(cellClickedId);
    console.log(cellClickedElement);
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
    if(checkWin(cellRow,cellColumn)){
        let winningPlayer = getWinningPlayer();
        alert("Player "+winningPlayer+" has won!!!");
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
        let table = document.getElementById("table");
        // document.body.removeChild(table);
        makeTable(board);
    }else if (checkTie()){
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
        let table = document.getElementById("table");
        // document.body.removeChild(table);
        makeTable(board);
    }else{
        redTurn = !redTurn;
        }
}

makeTable(board);