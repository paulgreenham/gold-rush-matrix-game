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

initialSetUp(5, 5)


$("button").on("click", function () {
    let rowNum = $(this).closest("div").find("#row-num").val()
    let colNum = $(this).closest("div").find("#col-num").val()
    board.resetScores()
    initialSetUp(rowNum, colNum)
    $("button").text("Start over")
})


const getCellCoords = function(cell) {
    let cellX = cell.data("x")
    let cellY = cell.closest(".board-row").data("y")
    return [cellX, cellY]
}

const subtractEqualLengthArrays = function (arr1, arr2) {
    let diffArray = []
    for (let i = 0; i < arr1.length; i ++) {
        diffArray.push(arr1[i] - arr2[i])
    }
    return diffArray
}

$("#board").on("click", ".cell", function () {
    let cellPos = getCellCoords($(this))
    
    let pos1 = board.getPlayerCoords("player1")
    let pos2 = board.getPlayerCoords("player2")
    let movement1 = subtractEqualLengthArrays(pos1, cellPos)
    let movement2 = subtractEqualLengthArrays(pos2, cellPos)

    if (movement1[0] === 0 && movement1[1] === 1) {
        board.movePlayer("player1", "up")
        renderAll()
    }
    else if (movement1[0] === 0 && movement1[1] === -1) {
        board.movePlayer("player1", "down")
        renderAll()
    }
    else if (movement1[0] === 1 && movement1[1] === 0) {
        board.movePlayer("player1", "left")
        renderAll()
    }
    else if (movement1[0] === -1 && movement1[1] === 0) {
        board.movePlayer("player1", "right")
        renderAll()
    }

    else if (movement2[0] === 0 && movement2[1] === 1) {
        board.movePlayer("player2", "up")
        renderAll()
    }
    else if (movement2[0] === 0 && movement2[1] === -1) {
        board.movePlayer("player2", "down")
        renderAll()
    }
    else if (movement2[0] === 1 && movement2[1] === 0) {
        board.movePlayer("player2", "left")
        renderAll()
    }
    else if (movement2[0] === -1 && movement2[1] === 0) {
        board.movePlayer("player2", "right")
        renderAll()
    }

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