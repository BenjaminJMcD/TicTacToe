

function Gameboard () {

    const board = [];

    for (let i = 0; i < 9; i++) {
          board.push(Cell());
    }

    const getBoard = () => board;

    const dropToken = (square, player) => {

        board[square].addToken(player);
    }

    const printBoard = () => {
        const boardWithCellValues = board.map((cell) => cell.getValue());

        return boardWithCellValues;
    }

    return {getBoard, dropToken, printBoard}  
}

function Cell() {
    let value = 0;

    const addToken = (player) => {
        value = player;
    }

    const getValue = () => value;

    return {addToken, getValue}
}

function GameController() {

    const board = Gameboard();

    const players = [
        {
            name: "X",
            token: 1
        },
        {
            name: "O",
            token: 2
        }
    ];

    let activePlayer = players[0]

    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

 
    const printNewRound = () => {
         board.printBoard();
    };

    const playRound = (selection) => {
        board.dropToken(selection, getActivePlayer().token);

        switchPlayer();
        printNewRound();
    };

    printNewRound();

    return {
        playRound,
        getActivePlayer,
        printBoard: board.printBoard
    };

};

function ScreenController() {

    const gameBoard = document.getElementById("gameBoard");
    
    const game = GameController();


    const updateScreen = () => {
        gameBoard.innerHTML = "";
        const board = game.printBoard();
        console.log(board);

        for (i=0; i<board.length; i++) {

         const cellButton = document.createElement("button");
         cellButton.classList.add("gameSquare");
         cellButton.dataset.square = i;
         //cellButton.textContent = board[i];
         if (board[i] == 0) {
            cellButton.textContent = "";
         }
         else if (board[i] == 1) {
            cellButton.textContent = "X"
         }
         else if (board[i] == 2) {
            cellButton.textContent = "O"
         }
         gameBoard.appendChild(cellButton);
       }
  }

    const clickHandler = (e) => {

        const square = e.target.dataset.square;

        game.playRound(square);

        updateScreen();

    }

    gameBoard.addEventListener("click", clickHandler);

    updateScreen();

    return {
        clickHandler
    }
}


ScreenController();