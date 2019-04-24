class Matrix {
    constructor () {
        this.matrix = []
    }


    generateMatrix(numRows, numColumns) {
        let matrix = []
        let num = 1
        
        for (let r = 0; r < numRows; r++) {
            matrix.push([])
            for (let c = 0; c < numColumns; c++) {
                matrix[r].push(num++)
            }
        }
        this.matrix = matrix
    }

    print() {
        console.log('\n')
        for (let r = 0; r < this.matrix.length; r ++) {
            let rowStr = ""
            for (let c = 0; c < this.matrix[r].length; c ++) {
                rowStr += `${this.matrix[r][c]}\t`
            }
            console.log(rowStr)
        }
    }

    get(x, y) {
        return this.matrix[y][x]
    }

    getColumn(colNum) {
        let column = []
        for (let i = 0; i < this.matrix.length; i++) {
            column.push(this.matrix[i][colNum])
        }
        return column
    }

    printColumn(colNum) {
        console.log(this.getColumn(colNum))
    }

    getRow(rowNum) {
        let row =[]
        for (let c = 0; c < this.matrix[rowNum].length; c ++) {
            row.push(this.matrix[rowNum][c])
        }
        return row
    }

    printRow(rowNum) {
        console.log(this.getColumn(rowNum))
    }

    alter(x, y, newValue) {
        this.matrix[y][x] = newValue
    }

    findCoordinate(value) {
        for (let r = 0; r < this.matrix.length; r ++) {
            for (let c = 0; c < this.matrix[r].length; c ++) {
                if (this.get(c,r) == value) {
                    return { x: c, y: r }
                }
            }
        }
    }
}