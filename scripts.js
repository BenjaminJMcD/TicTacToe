

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
    // const dropToken = (square, player) => {

    //     const markedSquare = board[square].addToken(player);
    // }

    // PRINT TO CONSOLE DONT NEED AFTER UI
    // const printBoard = () => {
    // }

    const printBoard = () => {
        const boardWithCellValues = board.map((cell) => cell.getValue());

        console.log(boardWithCellValues)
    }

    return {getBoard, printBoard}  
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
    //     console.log(`${getActivePlayer().name}'s turn`)
    };

    //const playRound = (square) => {
        //board.dropToken(square, getActivePlayer().token);

        //GET SQUARE VALUE FROM CLICK HANDLER DATA
        //PASS INTO DROPTOKEN

        //RUN UPDATE SCREEN


        //switchPlayer();
        //printNewRound();
    //};

    printNewRound();

    return {
        //playRound,
        getActivePlayer,
    };

};

const game = GameController();

