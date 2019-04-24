const board = new GoldRush()
board.loadBoard(5, 5)
board.print()

board.movePlayer(1, "down")
board.print()

board.movePlayer(2, "left")
board.print()

board.populateCoins("c")
board.print()

board.movePlayer(1, "down")
board.print()

board.movePlayer(2, "up")
board.print()

board.movePlayer(1, "right")
board.print()

board.movePlayer(2, "left")
board.print()

board.populateCoins("c")
board.print()