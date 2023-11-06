

function Gameboard () {

    // return GET BOARD
    // return HANDLE CLICK --- ??????

    const board = [];

    for (let i = 0; i < 9; i++) {
          board.push(Cell());
    }

    // GET STATE OF BOARD AS ARRAY
    const getBoard = () => board;

    // ASSIGN SQUARE/ARRAY WITH VALUE --- ???????
    const dropToken = (square, player) => {

        board[square].addToken(player);
    }

    // PRINT TO CONSOLE DONT NEED AFTER UI


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

        //GET SQUARE VALUE FROM CLICK HANDLER DATA
        //PASS INTO DROPTOKEN

        //RUN UPDATE SCREEN


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
         cellButton.textContent = board[i];
         gameBoard.appendChild(cellButton);
       }
  }

    const clickHandler = (e) => {

        const square = e.target.dataset.square;

        game.playRound(square);

        updateScreen();
        
        //console.log(square)
        // GET SQUARE VALUE FROM DOM
        // PASS INTO PLAYROUND
        // RUN UPDATE SCREEN


    }

    gameBoard.addEventListener("click", clickHandler);

    updateScreen();

    return {
        clickHandler
    }
}


ScreenController();