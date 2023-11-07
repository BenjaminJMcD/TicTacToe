

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

    // RESET GAME FUNCTIONALITY

    // resetBoard = () => {
    //     for (let i=0; i<9; i++) {
    //         board[i].addToken(0);
    //     }
    //     console.log(board)
    // }

    return {getBoard, 
            dropToken, 
            printBoard
            //resetBoard
    }  
}

function Cell() {
    let value = 0;

    const addToken = (player) => {
        if (value == 0) {
            value = player;
        }
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

    const updateGameStatus = (message) => {
        let gameStatus = document.getElementById("gameStatus");
        gameStatus.innerText = "";
        gameStatus.innerText = message
    }

    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];

        if (activePlayer === players[0]) {
            updateGameStatus("X's Turn")
        }
        else if (activePlayer === players[1]) {
            updateGameStatus("O's Turn")
        }
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

    // CHECK WIN FUNCTIONALITY

    // const checkWin = () => {

    // }

    return {
        playRound,
        getActivePlayer,
        updateGameStatus,
        printBoard: board.printBoard,
        resetBoard: board.resetBoard
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

        const clicked = e.target;
        const square = e.target.dataset.square;

        if (clicked.innerText == "") {
            game.playRound(square);
        }
        else {
            return
        }

        updateScreen();
    }

    gameBoard.addEventListener("click", clickHandler);

    // RESET GAME FUNCTIONALITY

    // let resetButton = document.getElementById("reset");

    // const resetGame = () => {
    //     game.resetBoard();
    //     updateScreen();
    // }

    // resetButton.addEventListener("click", resetGame);

    updateScreen();

    return {
        clickHandler,
        resetGame
    }
}


ScreenController();