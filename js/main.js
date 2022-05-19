const player = (name, symbol) => {
    const getName = () => name
    const getSymbol = () => symbol
    return {getName, getSymbol};
}

const players = [player('michael', 'X'), player('bob', 'O')]

const gameBoard = (() => {
    let square = Array.from({length : 9}, function(x) {
        x = {
            value : null,
            display : document.createElement('div')
        }
        x.display.classList.add('gameSquare')
        return x;
    })
    return {square};
})();


const gameController = (() => {
    let currPlayer = players[0]
    return {currPlayer}
})();

const displayController = (() => {
    const container = document.createElement('div')
    container.classList.add('container')

    const body = document.querySelector('body')

    body.appendChild(container)
    gameBoard.square.forEach(function(square, squareIndex) {
        container.appendChild(square.display)
        console.log(squareIndex)
        square.display.addEventListener("click", x => {
            if(x.target.innerHTML) return
            x.target.innerHTML = `<p class="squareText">${gameController.currPlayer.getSymbol()}</p>`;
            square.value = gameController.currPlayer.getSymbol()
            console.log(checkWinner(gameController.currPlayer, squareIndex))
            changePlayer();
        })
    })
})();

function changePlayer () {
    gameController.currPlayer = gameController.currPlayer == players[0]? players[1] : players[0];
    
}

function checkWinner (roundPlayer, squarePlace) {
    let filledSquares = gameBoard.square
    if(!filledSquares[1].value && !filledSquares[3].value && !filledSquares[4].value && !filledSquares[5].value && !filledSquares[7].value){
        return "pog"
    }
    if(checkHoriz(gameBoard.square, roundPlayer.getSymbol(), squarePlace) || checkVert(gameBoard.square, roundPlayer.getSymbol(), squarePlace) || checkDiag(gameBoard.square, roundPlayer.getSymbol(), squarePlace)) {
        return `Congratulations ${roundPlayer.getName()}`
    }
}

function checkHoriz(board, symb, index) {
    if(index < 3) {
        if(board[index].value == symb && board[index + 3].value == symb && board[index + 6].value == symb) {
            return true
        }
        return false;
    }
    else if(index < 6) {
        if(board[index].value == symb && board[index - 3].value == symb && board[index + 3].value == symb) {
            return true
        }
        return false;
    }
    else {
        if(board[index].value == symb && board[index - 3].value == symb && board[index - 6].value == symb) {
            return true
        }
        return false;
    }
}

function checkDiag (board, symb, index) {
    return false
}

function checkVert (board, symb, index) {
    return false
}