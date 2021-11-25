const cellSize = 60

// export const gridCoordinatesToPhaser = (vec: Phaser.Math.Vector2, size = cellSize) => {
//     return new Phaser.Math.Vector2(
//         Math.round(vec.x * size + cellSize / 2),
//         Math.round(vec.y * size + cellSize / 2)
//     )
// }

// export const phaserCoordinatesToGrid = (vec: Phaser.Math.Vector2) => {
//     return new Phaser.Math.Vector2(
//         Math.ceil((vec.x - cellSize / 2) / cellSize),
//         Math.ceil((vec.y - cellSize / 2) / cellSize)
//     )
// }

export const phaserCoordinatesToLevelEditor = (vec: Phaser.Math.Vector2, size: number) => {
    return new Phaser.Math.Vector2(Math.floor(vec.x / size), Math.floor(vec.y / size))
}

export const levelEditorToPhaser = (vec: Phaser.Math.Vector2, size = cellSize) => {
    return new Phaser.Math.Vector2(vec.x * size, vec.y * size)
}

export default class GridManager {
    level: GameLevel

    width!: number
    height!: number
    cellSize!: number
    xOffset!: number
    yOffset!: number

    constructor(width: number, height: number, level: GameLevel) {
        this.level = level

        this.setDimensions(width, height)
    }

    gridToPhaser(v: Phaser.Math.Vector2) {
        const x = Math.ceil(v.x * this.cellSize + this.cellSize / 2 + this.xOffset)
        // const x = Math.round(v.x * this.cellSize + this.xOffset)
        const y = Math.ceil(v.y * this.cellSize + this.cellSize / 2 + this.yOffset)
        // const y = Math.round(v.y * this.cellSize + this.yOffset)
        return new Phaser.Math.Vector2(x, y)
    }

    phaserToGrid(v: Phaser.Math.Vector2) {
        // const x = Math.round((v.x - this.xOffset) / this.cellSize)
        const x = Math.ceil((v.x - this.xOffset - this.cellSize / 2) / this.cellSize)
        // const x = Math.round((v.x - this.xOffset) / this.cellSize)
        // const y = Math.round((v.y - this.yOffset) / this.cellSize)
        const y = Math.ceil((v.y - this.yOffset - this.cellSize / 2) / this.cellSize)
        // const y = Math.round((v.y - this.yOffset) / this.cellSize)
        return new Phaser.Math.Vector2(x, y)
    }

    setDimensions(width: number, height: number) {
        this.width = width
        this.height = height

        const blockWidth = this.width / this.level.width
        const blockHeight = this.height / this.level.height

        this.cellSize = Math.floor(Math.min(blockWidth, blockHeight))
        if (this.cellSize % 2 === 1) {
            this.cellSize -= 1
        }

        const realWidth = this.level.width * this.cellSize
        const realHeight = this.level.height * this.cellSize

        this.xOffset = (width - realWidth) / 2
        this.yOffset = (height - realHeight) / 2
    }

    resize(griddable: Phaser.Physics.Arcade.Image) {
        griddable.setDisplaySize(this.cellSize, this.cellSize)
        griddable.body.setSize(this.cellSize, this.cellSize)
    }

    reposition(griddable: Phaser.Physics.Arcade.Image, gridPosition: Phaser.Math.Vector2) {
        const v = this.gridToPhaser(gridPosition)

        griddable.setPosition(v.x, v.y)
        griddable.body.position.x = v.x
        griddable.body.position.y = v.y
    }
}
