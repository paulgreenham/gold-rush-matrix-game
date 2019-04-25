class GoldRush extends Matrix {
    constructor(matrix) {
        super(matrix)
        this.playerLocations = {}
        this.xLimit
        this.yLimit
        this.player1 = "player1"
        this.player2 = "player2"
        this.wallLocations
        this.wallSymbol = "wall"
        this.coinLocations
        this.coinSymbol = "coin"
        this.score = {
            "player1" : 0,
            "player2" : 0,
        }
    }

    //y-axis: matrix rows, x-axis: matrix columns

    loadBoard(numColumns, numRows) {
        let newMatrix = []
        this.xLimit = numColumns - 1
        this.yLimit = numRows - 1
        
        for (let y = 0; y < numRows; y++) {
            newMatrix.push([])
            for (let x = 0; x < numColumns; x++) {
                newMatrix[y].push(".")
            }
        }

        newMatrix[0][0] = this.player1
        newMatrix[this.yLimit][this.xLimit] = this.player2
        this.playerLocations[this.player1] = { x: 0, y: 0}
        this.playerLocations[this.player2] = { x: this.xLimit, y: this.yLimit}

        this.matrix = newMatrix
    }

    getRandomX() {
        return Math.ceil(Math.random() * (this.xLimit + 1)) - 1
    }

    getRandomY() {
        return Math.ceil(Math.random() * (this.yLimit + 1)) - 1
    }

    createCoordPair(xCoord, yCoord) {       //create { x: y } object
        let coordObj = {}
        coordObj[xCoord] = yCoord
        return coordObj
    }

    addPlayerCoords(array) {
        array.push(this.createCoordPair(this.playerLocations[this.player1].x, this.playerLocations[this.player1].y))
        array.push(this.createCoordPair(this.playerLocations[this.player2].x, this.playerLocations[this.player2].y))
    }

    getArrayOfCoords(arrayOfInvalid, length) {      //populate new array with { x: y } coordinate pair objects that do not coincide with objects in the input array
        let coordArray = []
        for (let i = 0; i < length; i ++) {     
            let xCoord = this.getRandomX()
            let yCoord = this.getRandomY()
            let coordinates = this.createCoordPair(xCoord, yCoord)
            while (arrayOfInvalid.some(invalid => JSON.stringify(invalid) === JSON.stringify(coordinates))) {      //check if position has already been taken
                xCoord = this.getRandomX()
                yCoord = this.getRandomY()
                coordinates = this.createCoordPair(xCoord, yCoord)
            }
            arrayOfInvalid.push(coordinates)
            coordArray.push(coordinates)
        }
        return coordArray
    }

    getRandomWallMetrics() {
        let totalCells = (this.xLimit + 1) * (this.yLimit + 1)
        let wallNumber = Math.ceil((Math.random() + 1) * totalCells / 10)

        let usedCoordinates = []
        this.addPlayerCoords(usedCoordinates)

        return this.getArrayOfCoords(usedCoordinates, wallNumber)
    }


    populateObjects(metricsArray, symbol) {
        for (let i = 0; i < metricsArray.length; i ++) {
            let x = Object.keys(metricsArray[i])[0]
            let y = metricsArray[i][x]
            this.alter(x, y, symbol)
        }
    }

    populateWalls() {
        this.wallLocations = this.getRandomWallMetrics()
        this.populateObjects(this.wallLocations, this.wallSymbol)
    }

    getRandomCoinMetrics() {
        let totalFreeCells = (this.xLimit + 1) * (this.yLimit + 1) - (2 + this.wallLocations.length)
        let coinNumber = Math.ceil(Math.random() * totalFreeCells)

        let usedCoordinates = []
        this.addPlayerCoords(usedCoordinates)
        usedCoordinates.push(...this.wallLocations)

        return this.getArrayOfCoords(usedCoordinates, coinNumber)
    }

    populateCoins() {
        this.coinLocations = this.getRandomCoinMetrics()
        this.populateObjects(this.coinLocations, this.coinSymbol)
    }

    setMovementByAxis(direction) {
        let movementArray = [0, 0]      //["horizontal change", "vertical change"]
        
        if (direction === "left") {
            movementArray[0] = -1
        }
        else if (direction === "right") {
            movementArray[0] = 1
        }
        else if (direction === "up") {
            movementArray[1] = -1
        }
        else if (direction === "down") {
            movementArray[1] = 1
        }

        return movementArray
    }

    hasInvalidX(xCoord) {
        return xCoord < 0 || xCoord > this.xLimit
    }

    hasInvalidY(yCoord) {
        return yCoord < 0 || yCoord > this.yLimit
    }

    getOtherPlayer(player) {
        let playerIndex = parseInt(player[player.length - 1]) - 1
        let newPlayerIndex = Math.abs(playerIndex - 1)
        return "player" + (newPlayerIndex + 1).toString()
    }

    hasXConverge(player, xCoord) {
        return this.playerLocations[player].x + xCoord === this.playerLocations[this.getOtherPlayer(player)].x
    }

    hasYConverge(player, yCoord) {
        return this.playerLocations[player].y + yCoord === this.playerLocations[this.getOtherPlayer(player)].y
    }

    coordsInWall(x, y) {
        let coordinates = this.createCoordPair(x, y)
        return this.wallLocations.some(w => JSON.stringify(w) === JSON.stringify(coordinates))
    }

    isInvalidMove(player, movementArray) {

        if (this.hasInvalidX(this.playerLocations[player].x + movementArray[0])) { 
            return true
        }
        else if (this.hasInvalidY(this.playerLocations[player].y + movementArray[1])) { 
            return true
        }

        else if (this.hasXConverge(player, movementArray[0]) && this.hasYConverge(player, movementArray[1])) {
            return true     //ie. intended move converges on position of other player
        }

        else if (this.coordsInWall(this.playerLocations[player].x + movementArray[0], this.playerLocations[player].y + movementArray[1])) {
            return true
        }

        else {
            return false
        }
    }

    isCoin(x, y) {
        if (this.get(x, y) === this.coinSymbol) {
            return true
        }
        else {
            return false
        }
    }

    adjustPlayerPosition(player, movementArray) {
        this.playerLocations[player].x += movementArray[0]
        this.playerLocations[player].y += movementArray[1]
    }

    movePlayer(player, direction) {
        let movementArray = this.setMovementByAxis(direction)

        if (this.isInvalidMove(player, movementArray)) { return }

        this.alter(this.playerLocations[player].x, this.playerLocations[player].y, ".")
        this.adjustPlayerPosition(player, movementArray)
        if (this.isCoin(this.playerLocations[player].x, this.playerLocations[player].y)) {
            this.score[player] += 10
        }
        this.alter(this.playerLocations[player].x, this.playerLocations[player].y, player)
    }

    getScores() {
        return this.score
    }

    getPlayerCoords(player) {
        return [this.playerLocations[player].x, this.playerLocations[player].y]
    }

    resetScores() {
        this.score[this.player1] = 0
        this.score[this.player2] = 0
    }

    getWinner() {
        if (this.score[this.player1] == this.score[this.player2]) {
            return "draw"
        }
        else {
            return this.score[this.player1] > this.score[this.player2] ? this.player1 : this.player2
        }
    }
    
    finishGame() {
        let totalScore = this.score[this.player1] + this.score[this.player2]
        if (this.coinLocations.length === totalScore / 10) {
            return this.getWinner()
        }
        else {
            return false
        }
    }
}