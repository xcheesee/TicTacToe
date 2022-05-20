const body = document.querySelector('body')

const player = (name, symbol) => {
    const getName = () => name
    const getSymbol = () => symbol
    return {getName, getSymbol};
}

const players = (() => {
    let list = []
    const store = player => list.push(player)
    return {list, store}
})();

players.store(player('michael', 'X'))
players.store(player('bob', 'O'))

const gameBoard = (() => {
    let square = Array.from({length : 9}, function(x) {
        x = {
            value : null,
            display : document.createElement('div')
        }
        x.display.classList.add('gameSquare')
        return x;
    })
    const clean = () => {
        // body.removeChild(document.querySelector('.container'))
        square.forEach(function (element) {
        element.value = null,
        element.display.innerHTML = ''
        element.display.classList.remove('winnerLine')
        })
        displayController.drawBoard()
        gameController.resetPlays()
    }

    return {square, clean}

})();

let button = document.querySelector('button')
button.addEventListener('click', gameBoard.clean)

const gameController = (() => {
    let counter = 0;
    let currPlayer = players.list[0]
    let play = () => {
        return counter++;
    }

    const getPlays = () => counter;
    let resetPlays = () => counter = 0;
    const declareWin = (player) => `Congrats ${player}`

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
            if(checkWinner(gameController.currPlayer, elementIndex) == 'random') {gameBoard.clean()}
            else {
                changePlayer();
            }
        })
    })
    const drawBoard = () => {
        gameBoard.square.forEach(function(square) {
        container.appendChild(square.display)
        // square.display.addEventListener("click", x => {
        //     if(x.target.innerHTML) return
        //     x.target.innerHTML = `<p class="squareText">${gameController.currPlayer.getSymbol()}</p>`;
        //     square.value = gameController.currPlayer.getSymbol()
        //     gameController.play();
        //     if(checkWinner(gameController.currPlayer, squareIndex) == 'random') {gameBoard.clean()}
        //     else {
        //         changePlayer();
        //     }
        // })
    })}
    return {drawBoard}
})();


function changePlayer () {
    gameController.currPlayer = gameController.currPlayer == players.list[0]? players.list[1] : players.list[0];
    
}

function checkWinner (roundPlayer, squarePlace) {
    let filledSquares = gameBoard.square
    if(!filledSquares[1].value && !filledSquares[3].value && !filledSquares[4].value && !filledSquares[5].value && !filledSquares[7].value || gameController.getPlays() < 4){
        return 'inconclusive';
    } else if(checkHoriz(gameBoard.square, roundPlayer.getSymbol(), squarePlace) || checkVert(gameBoard.square, roundPlayer.getSymbol(), squarePlace) || checkDiag(gameBoard.square, roundPlayer.getSymbol(), squarePlace)) {
        return gameController.declareWin(roundPlayer.getName());
    } else if(gameController.getPlays() > 8) {
        return 'random';
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

function checkDiag (board, symb, index) {
    if(index == 4) {
        if(board[index].value == symb && board[index + 2].value == symb && board[index - 2].value == symb || board[index].value == symb && board[index + 4].value == symb && board[index - 4].value == symb) {
            // drawWin(index, index + 4, index + 8, board) need to break the conditionals to correct function
            return true;
        }
        return false;
    }
    else if(index == 0) {
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