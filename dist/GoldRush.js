class GoldRush extends Matrix {
    constructor(matrix) {
        super(matrix)
        this.playerLocations = {}
        this.xLimit
        this.yLimit
        this.player1 = "1"
        this.player2 = "2"
        this.coinLocations
        this.coinSymbol = "c"
        this.score = {
            "1" : 0,
            "2" : 0,
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

    getRandomCoinMetrics() {
        let coinMetrics = []

        let totalFreeCells = (this.xLimit + 1) * (this.yLimit + 1) - 2
        let coinNumber = Math.ceil(Math.random() * totalFreeCells)

        let usedCoordinates = []        //add current players' positions to the array of used coordinates
        usedCoordinates.push(this.createCoordPair(this.playerLocations[this.player1].x, this.playerLocations[this.player1].y))
        usedCoordinates.push(this.createCoordPair(this.playerLocations[this.player2].x, this.playerLocations[this.player2].y))

        for (let i = 0; i < coinNumber; i ++) {     //populate coinMetrics array with { x: y } coordinate pair objects
            let xCoord = this.getRandomX()
            let yCoord = this.getRandomY()
            let coordinates = this.createCoordPair(xCoord, yCoord)
            while (usedCoordinates.some(cp => JSON.stringify(cp) === JSON.stringify(coordinates))) {      //check if position has already been taken
                xCoord = this.getRandomX()
                yCoord = this.getRandomY()
                coordinates = this.createCoordPair(xCoord, yCoord)
            }
            usedCoordinates.push(coordinates)
            coinMetrics.push(coordinates)
        }
        return coinMetrics
    }

    populateCoins() {
        this.coinLocations = this.getRandomCoinMetrics()
        for (let i = 0; i < this.coinLocations.length; i ++) {
            let x = Object.keys(this.coinLocations[i])[0]
            let y = this.coinLocations[i][x]
            this.alter(x, y, this.coinSymbol)
        }
    }

    setMovementByAxis(direction) {
        let movementArray = [0, 0]      //["vertical change", "horizontal change"]
        
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

    goesOutOfBounds(player, movementArray) {     //to be completed later
        return false
    }

    isCoin(x, y) {
        if (this.get(x, y) === this.coinSymbol) {
            return true
        }
        else {
            return false
        }
    }

    movePlayer(player, direction) {
        let playerKey = player.toString()
        let movementArray = this.setMovementByAxis(direction)

        // if(this.goesOutOfBounds(playerKey, movementArray)) { return }

        this.alter(this.playerLocations[playerKey].x, this.playerLocations[playerKey].y, ".")
        this.playerLocations[playerKey].x += movementArray[0]
        this.playerLocations[playerKey].y += movementArray[1]
        if (this.isCoin(this.playerLocations[playerKey].x, this.playerLocations[playerKey].y)) {
            this.score[playerKey] += 10
        }
        this.alter(this.playerLocations[playerKey].x, this.playerLocations[playerKey].y, playerKey)
    }

    getScores() {
        return this.score
    }
}