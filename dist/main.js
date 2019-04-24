const board = new GoldRush()
const renderer = new Renderer()

const renderAll = function () {
    renderer.renderBoard(board.getMatrix())
    renderer.renderScores(board.getScores())
}

const initialSetUp = function (rowNum, colNum) {
    board.loadBoard(colNum, rowNum)
    board.populateWalls()
    board.populateCoins()

    renderAll()
}

$("button").on("click", function () {
    let rowNum = $(this).closest("div").find("#row-num").val()
    let colNum = $(this).closest("div").find("#col-num").val()
    initialSetUp(rowNum, colNum)
    $("button").text("Start over")
})


$(document).keydown(function (event) {

    if (event.which == 87) {
        board.movePlayer("player1", "up")
        renderAll()
    }
    else if (event.which == 83) {
        board.movePlayer("player1", "down")
        renderAll()
    }
    else if (event.which == 65) {
        board.movePlayer("player1", "left")
        renderAll()
    }
    else if (event.which == 68) {
        board.movePlayer("player1", "right")
        renderAll()
    }

    else if (event.which == 73) {
        board.movePlayer("player2", "up")
        renderAll()
    }
    else if (event.which == 75) {
        board.movePlayer("player2", "down")
        renderAll()
    }
    else if (event.which == 74) {
        board.movePlayer("player2", "left")
        renderAll()
    }
    else if (event.which == 76) {
        board.movePlayer("player2", "right")
        renderAll()
    }

})