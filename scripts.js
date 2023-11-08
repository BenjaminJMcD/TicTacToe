

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

    const resetBoard = () => {
        
        board.splice(0, 9);

        for (i=0; i<9; i++) {
            board.push(Cell());
        }

        printBoard();
    }

    const endGame = () => {
        for (i=0; i<9; i++) {
            board[i].addToken(3);
        }
    }

    return {getBoard, 
            dropToken, 
            printBoard,
            resetBoard,
            endGame
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

    const winningAxes = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    const checkWin = () => {
        let boardStatus = board.printBoard();

        winningAxes.forEach((index) => {
            if (boardStatus[index[0]] === 1 && boardStatus[index[1]] === 1 && boardStatus[index[2]] === 1) {
                console.log(index[0], index[1], index[2])
                updateGameStatus("PLAYER X WINS!")
                board.endGame();
            }
            else if (boardStatus[index[0]] === 2 && boardStatus[index[1]] === 2 && boardStatus[index[2]] === 2) {
                console.log(index[0], index[1], index[2])
                updateGameStatus("PLAYER O WINS!")
                board.endGame();
            }
        })
    }

    const checkDraw = () => {
        let boardStatus = board.printBoard();

        function getSum(total, num) {
            return total + num
        }

        return boardStatus.reduce(getSum, 0)
    }

    return {
        playRound,
        getActivePlayer,
        updateGameStatus,
        switchPlayer,
        checkWin,
        checkDraw,
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

        if (game.checkDraw() == 13) {
            game.updateGameStatus("IT'S A DRAW")
        }

        game.checkWin();
        updateScreen();
    }

    gameBoard.addEventListener("click", clickHandler);

    let resetButton = document.getElementById("reset");

    const resetGame = () => {

        if (game.getActivePlayer().token == 2) {
            game.switchPlayer();
        }

        game.resetBoard();
        updateScreen();
    }

    resetButton.addEventListener("click", resetGame);

    updateScreen();

    return {
        clickHandler,
        resetGame
    }
}


ScreenController();