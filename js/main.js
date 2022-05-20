const body = document.querySelector('body')
const winnerOverlay = document.querySelector('.winOverlay')
let button = document.querySelector('button')

const player = (name, symbol) => {
    const getName = () => name
    const getSymbol = () => symbol
    return {getName, getSymbol};
}

const players = (() => {
    let list = []
    const store = player => list.push(player)
    const getList = () => list;
    return {getList, store}
})();

players.store(player('michael', 'X'))
players.store(player('bob', 'O'))

const gameBoard = (() => {
    let square = Array.from({length : 9}, function(element) {
        element = {
            value : null,
            display : document.createElement('div')
        }
        element.display.classList.add('gameSquare')
        return element;
    });
    const clean = () => {
        square.forEach(function (element) {
            element.value = null,
            element.display.innerHTML = ''
        element.display.classList.remove('winnerLine')
        })
        displayController.drawBoard()
        gameController.resetPlays()
        gameController.currPlayer = players.getList()[0];
        winnerOverlay.classList.remove('showEle')
        body.appendChild(button)
    };

return {square, clean}
})();

button.addEventListener('click', gameBoard.clean)


const gameController = (() => {
    let counter = 0;
    let currPlayer = players.getList()[0]
    let play = () => counter++;
    let resetPlays = () => counter = 0;
    const getPlays = () => counter;
    const declareWin = (player) => {    
        let winBox = document.createElement('div')
        winBox.classList.add('winBox')
        winBox.innerHTML = `Congratulations , ${player}, you won!`
        winBox.appendChild(button)
        winnerOverlay.appendChild(winBox)
        winnerOverlay.classList.add('showEle')
    }

    return {currPlayer, play, getPlays, resetPlays, declareWin};
})();

const displayController = (() => {
    const container = document.createElement('div')
    container.classList.add('container')
    body.appendChild(container)

    gameBoard.square.forEach(function(element, elementIndex) {
        element.display.addEventListener("click", x => {
            if(x.target.innerHTML) return

            x.target.innerHTML = `<p class="squareText">${gameController.currPlayer.getSymbol()}</p>`;
            element.value = gameController.currPlayer.getSymbol()
            gameController.play();
            if(checkWinner(gameController.currPlayer, elementIndex) === 1) {
                gameBoard.clean()
            } else {
                changePlayer();
            }
        })
    })
    const drawBoard = () => {
        gameBoard.square.forEach(function(square) {
        container.appendChild(square.display)
    })}
    return {drawBoard}
})();


function changePlayer () {
    gameController.currPlayer = gameController.currPlayer == players.getList()[0]? players.getList()[1] : players.getList()[0];
    
}

function checkWinner (roundPlayer, squarePlace) {
    let args = [gameBoard.square, roundPlayer.getSymbol(), squarePlace]
    let filledSquares = gameBoard.square
    if(!filledSquares[1].value && !filledSquares[3].value && !filledSquares[4].value && !filledSquares[5].value && !filledSquares[7].value || gameController.getPlays() < 4){
        return 'inconclusive';
    } else if(checkHoriz(...args) || checkVert(...args) || checkDiag(...args)) {
        return gameController.declareWin(roundPlayer.getName());
    } else if(gameController.getPlays() > 8) {
        return 1;
    }
}

function checkVert(board, symb, index) {
    if(index < 3) {
        if(board[index].value == symb && board[index + 3].value == symb && board[index + 6].value == symb) {
            drawWin(index, index + 3, index + 6, board)
            return true
        }
        return false;
    } else if(index < 6) {
        if(board[index].value == symb && board[index - 3].value == symb && board[index + 3].value == symb) {
            drawWin(index, index - 3, index + 3, board)
            return true
        }
        return false;
    } else {
        if(board[index].value == symb && board[index - 3].value == symb && board[index - 6].value == symb) {
            drawWin(index, index - 3, index - 6, board)
            return true
        }
        return false;
    }
}

function checkDiag(board, symb, index) {
    if(index == 4) {
        if(board[index].value == symb && board[index + 2].value == symb && board[index - 2].value == symb ) {
            drawWin(index, index + 2, index + -2, board)
            return true;
        } else if (board[index].value == symb && board[index + 4].value == symb && board[index - 4].value == symb){
            drawWin(index, index + 4, index -4, board)
            return true;
        }
        return false;
    } else if(index == 0) {
        if(board[index].value == symb && board[index + 4].value == symb && board[index + 8].value == symb) {
            drawWin(index, index + 4, index + 8, board)
            return true;
        }
        return false;
    } else if(index == 2) {
        if(board[index].value == symb && board[index + 2].value == symb && board[index + 4].value == symb) {
            drawWin(index, index + 2, index + 4, board)
            return true;
        }
        return false;
    } else if(index == 6) {
        if(board[index].value == symb && board[index - 2].value == symb && board[index - 4].value == symb) {
            drawWin(index, index - 2, index - 4, board)
            return true;
        }
        return false;
    } else if(index == 8) {
        if(board[index].value == symb && board[index - 4].value == symb && board[index - 8].value == symb) {
            drawWin(index, index - 4, index - 8, board)
            return true;
        }
        return false;
    }
}

function checkHoriz (board, symb, index) {
    if(index == 0 || index == 3 || index == 6) {
        if(board[index].value == symb && board[index + 1].value == symb && board[index + 2].value == symb) {
            drawWin(index, index + 1, index + 2, board)
            return true;
        }
        return false;
    } else if(index == 1 || index == 4 || index == 7) {
        if(board[index].value == symb && board[index + 1].value == symb && board[index - 1].value == symb) {
            drawWin(index, index + 1, index - 1, board)
            return true;
        }
        return false;
    } else {
        if(board[index].value == symb && board[index - 1].value == symb && board[index - 2].value == symb) {
            drawWin(index, index - 1, index - 2, board)
            return true;
        }
        return false;
    }
}

function drawWin(place1, place2, place3, board) {
    board[place1].display.classList.add('winnerLine')
    board[place2].display.classList.add('winnerLine')
    board[place3].display.classList.add('winnerLine')
}

displayController.drawBoard()