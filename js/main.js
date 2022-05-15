const Player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;
    return {getName, getSymbol}
}

let michael = Player('michael', 'O');
let john = Player('john', 'X');

const gameBoard = (() => {
    const square = Array(9).fill(null).map(function(element) {
        element = {
            value : ' ',
            display : document.createElement('div')
        }

        element.display.classList.add('pogg')
        element.display.innerHTML = `<p>${element.value}</p>`
        return element;
    })
    return {square};
})();

const displayController = (() => {

    const body = document.querySelector('body');
    const container = document.createElement('div')

    container.classList.add('container')
    gameBoard.square.forEach(element => {
        element.display.addEventListener('click', x => x.target.innerHTML = `<p>${element.value}</p>`)
        container.appendChild(element.display)
    })
    
    body.appendChild(container)
})();