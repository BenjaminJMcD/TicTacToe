
// GAMEBOARD = ARRAY INSIDE GAMEBOARD OBJECT. IT IS ALSO A MODULE.

function Gameboard () {

    // return GET BOARD
    // return HANDLE CLICK
    // return PRINT BOARD ----- METHODS

    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
          board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const handleClick = (column, row, player) => {

    }

    const printBoard = () => {

    }

    console.log(board)
    return {getBoard, handleClick, printBoard}  
}

function Cell() {
    let value = 0;

    const addToken = (player) => {
        value = player;
    }

    const getValue = () => value;

    return {addToken, getValue}
}

function Player() {

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

    console.log(players[0].token)

    let activePlayer = players[0]

    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn`)
    };

    const playRound = () => {
        board.handleClick(getActivePlayer().token);

        switchPlayer();
        printNewRound();
    };

    printNewRound();

    return {
        playRound,
        getActivePlayer
    };

};
    

Gameboard();
Player();

