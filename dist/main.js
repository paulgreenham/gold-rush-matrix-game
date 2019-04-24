const board = new GoldRush()
const renderer = new Renderer()

const setBoardSize = function (colNum, rowNum) {
    $("#board").css("grid-template-rows", `repeat(${rowNum}, 1fr)`)
    $(".board-row").css("grid-template-columns", `repeat(${colNum}, 1fr)`)
}

const initialSetUp = function () {
    let colNum = 5
    let rowNum = 5

    board.loadBoard(colNum, rowNum)
    board.populateCoins()

    renderer.renderBoard(board.getMatrix())
    setBoardSize(colNum, rowNum)
}

initialSetUp()

$(document).keypress(function (e) {

    if (e.which == 119) {
          board.movePlayer(1, "up")
    }

})









// board.print()

// board.movePlayer(1, "down")
// board.print()

// board.movePlayer(2, "left")
// board.print()

// board.populateCoins("c")
// board.print()

// board.movePlayer(1, "down")
// board.print()

// board.movePlayer(2, "up")
// board.print()

// console.log(board.getScores())

// board.movePlayer(1, "right")
// board.print()

// board.movePlayer(2, "left")
// board.print()

// console.log(board.getScores())

// board.populateCoins("c")
// board.print()