const board = new GoldRush()
const renderer = new Renderer()

const renderAll = function () {
    renderer.renderBoard(board.getMatrix())
    renderer.renderScores(board.getScores())
}

const initialSetUp = function () {
    let colNum = 5
    let rowNum = 5

    board.loadBoard(colNum, rowNum)
    board.populateCoins()

    renderAll()
}

initialSetUp()


$(document).keydown(function (event) {

    if (event.which == 87) {
        board.movePlayer(1, "up")
        renderAll()
    }
    else if (event.which == 83) {
        board.movePlayer(1, "down")
        renderAll()
    }
    else if (event.which == 65) {
        board.movePlayer(1, "left")
        renderAll()
    }
    else if (event.which == 68) {
        board.movePlayer(1, "right")
        renderAll()
    }

    else if (event.which == 73) {
        board.movePlayer(2, "up")
        renderAll()
    }
    else if (event.which == 75) {
        board.movePlayer(2, "down")
        renderAll()
    }
    else if (event.which == 74) {
        board.movePlayer(2, "left")
        renderAll()
    }
    else if (event.which == 76) {
        board.movePlayer(2, "right")
        renderAll()
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