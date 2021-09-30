const statusDisplay = document.querySelector('.game-status');
// console.log(statusDisplay);

let gameActive = true;

let currentPlayer = 'X';

let gameState = [
                    '', '', '', 
                    '', '', '', 
                    '', '', ''
                ];

const winningMessage =()=> `Player ${currentPlayer} has won!`;
const drawMessage =()=> `Game ended in a draw`;
const currPlayerTurn =()=> `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currPlayerTurn();
// set winning conditions; different arrays of winning index values

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

/*
    functionality
    handle cell played
    handle player change
    handle result validation
    handle cell click
    handle restart game
*/

// second
const handleCellPlayed =(clickedCell, clickedCellIdx)=> {
    gameState[clickedCellIdx] = currentPlayer;
    console.log(currentPlayer);
    // change color of text for current player 
    // if (currentPlayer == 'X') {
    //     clickedCell.classList.add('red')
    //     // console.log(clickedCell);
    // } else {
    //     clickedCell.classList.add('blue')
    // }

    // rewrite using ternary
    currentPlayer == 'X' ? clickedCell.classList.add('red') : clickedCell.classList.add('blue')
    clickedCell.innerHTML = currentPlayer;
}

// fourth
const playerChange =()=> {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currPlayerTurn();
}

// third
const resultValidation =()=> {
    let roundWon = false;

    for (let i = 0; i <= 7; i++) {
        const winConditon = winningConditions[i];
        let a = gameState[winConditon[0]];
        let b = gameState[winConditon[1]];
        let c = gameState[winConditon[2]];

        if (a == '' || b == '' || c == '') {
            continue;
        }

        if (a == b && b == c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes('');
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    playerChange();
}

// first
const handleCellClicked =(clickedCellEvent)=> {

    // grab clicked cell
    const clickedCell = clickedCellEvent.target;
    // console.log('clicked')
    const clickedCellIdx = parseInt(clickedCell.getAttribute('data-cell-index'));
    // console.log(clickedCellIdx);

    // if the indexed item is not an empty string or if gameActive is false
    if (gameState[clickedCellIdx] !== '' || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIdx);
    resultValidation();
}

// fifth
const restartGame =()=> {
    gameActive = true;
    currentPlayer =  'X';
    gameState = [
                    '', '', '',
                    '', '', '',
                    '', '', ''
                ];
    statusDisplay.innerHTML = currPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = '');
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClicked));

document.querySelector('.game-restart').addEventListener('click', restartGame);