class Renderer {

    renderBoard(board) {
        const source = $("#board-template").html()
        const template = Handlebars.compile(source)
        const hbText = template({board})
        $("#board").empty().append(hbText)
        $("#board").css("grid-template-rows", `repeat(${board.length}, 1fr)`)
        $(".board-row").css("grid-template-columns", `repeat(${board[0].length}, 1fr)`)
    }

    renderScores(scores) {
        const source = $("#scores-template").html()
        const template = Handlebars.compile(source)
        const hbText = template(scores)
        $("#players").empty().append(hbText)
    }

    renderEnd(message) {
        $("#board").empty().text(message)
        $("#board").css("grid-template-rows", "")
        $("#board").addClass("end-message")
    }
}