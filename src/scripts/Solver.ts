enum MoveResult {
    WON,
    FELL,
    LANDED
}

type Cell = {
    code: string
    linkCode?: number
}

type Pos = {
    row: number
    col: number
}

class SolverLevel {
    matrix: (Cell | null)[][]
    cursor: Pos
    level: GameLevel
    cursorHistory: Pos[]
    visualCursorHistory: Pos[]

    constructor(
        level: GameLevel,
        matrix?: (Cell | null)[][],
        cursor?: Pos,
        cursorHistory?: Pos[],
        visualCursorHistory?: Pos[]
    ) {
        this.level = level
        if (matrix && cursor && cursorHistory && visualCursorHistory) {
            this.matrix = matrix
            this.cursor = cursor
            this.cursorHistory = cursorHistory
            this.visualCursorHistory = visualCursorHistory
            return this
        } else {
            this.matrix = []
            for (let i = 0; i < level.height; i++) {
                this.matrix.push([])
                for (let j = 0; j < level.width; j++) {
                    this.matrix[i].push(null)
                }
            }
            for (const block of level.blocks) {
                this.matrix[block.y][block.x] = {
                    code: block.code,
                    linkCode: block.linkCode
                }
            }
            this.cursor = { row: level.playerStart.y, col: level.playerStart.x }
            this.cursorHistory = [this.cursor]
            this.visualCursorHistory = [this.cursor]
        }
    }

    clone(): SolverLevel {
        return new SolverLevel(
            this.level,
            JSON.parse(JSON.stringify(this.matrix)),
            JSON.parse(JSON.stringify(this.cursor)),
            JSON.parse(JSON.stringify(this.cursorHistory)),
            JSON.parse(JSON.stringify(this.visualCursorHistory))
        )
    }

    applyMove(dir: Phaser.Math.Vector2) {
        let loc = this.cursor
        while (true) {
            loc = { row: loc.row + dir.y, col: loc.col + dir.x }
            // console.log(loc)
            if (
                loc.row < 0 ||
                loc.row >= this.level.height ||
                loc.col < 0 ||
                loc.col >= this.level.width
            ) {
                return MoveResult.FELL
            }
            if (this.matrix[loc.row][loc.col] !== null) {
                // console.log(this.matrix[loc.row][loc.col]?.code)
                break
            }
        }
        return this.statusFromLocation(loc, dir)
    }

    statusFromLocation({ row, col }: Pos, dir: Phaser.Math.Vector2, replace = false): MoveResult {
        if (row < 0 || row >= this.level.height || col < 0 || col >= this.level.width) {
            return MoveResult.FELL
        }
        const cell = this.matrix[row][col]

        let status = MoveResult.LANDED
        if (!cell) {
            status = MoveResult.LANDED
            this.cursor = { row, col }
        } else if (cell.code === 'a') {
            this.cursor = { row: row - dir.y, col: col - dir.x }
        } else if (cell.code === 'j') {
            status = MoveResult.WON
            this.cursor = { row, col }
        } else if (cell.code === 'g') {
            status = MoveResult.FELL
        } else if (cell.code === 'c') {
            // this.visualCursorHistory.push(this.cursor)
            return this.statusFromLocation({ row: row + dir.y, col: col + dir.x }, dir, true)
        } else if (cell.code === 'd') {
            this.visualCursorHistory.push({ row, col })
            const move = dir.clone().rotate(-Math.PI / 2)
            move.x = Math.round(move.x)
            move.y = Math.round(move.y)
            return this.statusFromLocation({ row: row + move.y, col: col + move.x }, dir, true)
        } else if (cell.code === 'b') {
            this.visualCursorHistory.push({ row: row - dir.y, col: col - dir.x })
            const otherPos = this.findLinked(cell)
            if (otherPos === null) {
                throw Error()
            }
            return this.statusFromLocation(
                { row: otherPos.row - dir.y, col: otherPos.col - dir.x },
                dir,
                true
            )
        } else if (cell.code === 'e') {
            this.visualCursorHistory.push({ row: row - dir.y, col: col - dir.x })
            const move = dir.clone().rotate(-Math.PI / 2)
            move.x = Math.round(move.x)
            move.y = Math.round(move.y)
            this.cursor = { row: row - dir.y, col: col - dir.x }
            // console.log()
            return this.applyMove(move)
        } else if (cell.code === 'f') {
            status = MoveResult.LANDED
            this.matrix[row][col] = null
            if (replace) {
                this.cursor = { row, col }
            } else {
                this.cursor = { row: row - dir.y, col: col - dir.x }
            }
        } else if (cell.code === 'h') {
            if (this.findLinked(cell)) {
                this.cursor = { row: row - dir.y, col: col - dir.x }
            } else {
                status = MoveResult.LANDED
                this.matrix[row][col] = null
                if (replace) {
                    this.cursor = { row, col }
                } else {
                    this.cursor = { row: row - dir.y, col: col - dir.x }
                }
            }
        } else if (cell.code === 'i') {
            this.matrix[row][col] = null
            return this.applyMove(dir)
        }

        this.cursorHistory.push(this.cursor)
        this.visualCursorHistory.push(this.cursor)
        return status
    }

    findLinked(cell: Cell): Pos | null {
        for (let row = 0; row < this.matrix.length; row++) {
            for (let col = 0; col < this.matrix[0].length; col++) {
                if (
                    this.matrix[row][col] !== cell &&
                    this.matrix[row][col]?.linkCode === cell.linkCode
                ) {
                    return { row, col }
                }
            }
        }
        return null
    }

    hash() {
        return JSON.stringify({
            matrix: this.matrix,
            cursor: this.cursor
        })
    }
}

// let i = 0
export default class Solver {
    moveSet: Phaser.Math.Vector2[]
    stack: SolverLevel[]
    set: Map<string, number>
    path?: Pos[]
    visualPath?: Pos[]

    constructor(level: GameLevel) {
        this.moveSet = [
            new Phaser.Math.Vector2(0, 1),
            new Phaser.Math.Vector2(0, -1),
            new Phaser.Math.Vector2(1, 0),
            new Phaser.Math.Vector2(-1, 0)
        ]
        const base = new SolverLevel(level)
        this.stack = [base]
        this.set = new Map()
    }

    branch() {
        while (this.stack.length > 0) {
            const s = this.stack.pop()
            if (!s) return
            this.set.set(s.hash(), s.cursorHistory.length)

            for (const move of this.moveSet) {
                const clone = s.clone()
                const result = clone.applyMove(move)
                if (result === MoveResult.WON) {
                    // console.log(clone.cursorHistory, result)
                    if (!this.path || clone.cursorHistory.length < this.path.length) {
                        this.path = clone.cursorHistory
                        this.visualPath = clone.visualCursorHistory
                        // console.log(this.path)
                    }
                } else if (result === MoveResult.LANDED) {
                    const hash = clone.hash()
                    const val = this.set.get(hash)
                    const goodToGo = val === undefined || val > clone.cursorHistory.length
                    if (goodToGo) {
                        this.set.set(clone.hash(), clone.cursorHistory.length)
                        this.stack.push(clone)
                    }
                }
            }
        }
        console.log(this.set)
    }
}
