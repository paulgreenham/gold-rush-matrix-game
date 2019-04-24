class Renderer {

    renderBoard(board) {
        const source = $("#board-template").html()
        const template = Handlebars.compile(source)
        const hbText = template({board})
        $("#board").empty().append(hbText)
    }

    renderScores() {

    }
}