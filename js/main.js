const player = (name, symbol) => {
    const getName = () => name
    const getSymbol = () => symbol
    return {getName, getSymbol};
}

let players = [player('michael', 'X'), player('bob', 'O')]

const gameBoard = (() => {
    let square = Array.from({length : 9}, function(x) {
        x = {
            value : 'x',
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
    gameBoard.square.forEach(element => {
        container.appendChild(element.display)
        element.display.addEventListener("click", x => {
            if(x.target.innerHTML) return
            changePlayer();
            x.target.innerHTML = `<p class="squareText">${gameController.currPlayer.getSymbol()}</p>`;
            checkWinner();
        })
    })
})();

function changePlayer () {
    gameController.currPlayer = gameController.currPlayer == players[0]? players[1] : players[0];
}

function checkWinner () {

}
