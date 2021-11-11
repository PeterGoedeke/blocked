export const cellSize = 60

export const gridCoordinatesToPhaser = (vec: Phaser.Math.Vector2) => {
    return new Phaser.Math.Vector2(vec.x * 60, vec.y * 60)
}

export const phaserCoordinatesToGrid = (vec: Phaser.Math.Vector2) => {
    return new Phaser.Math.Vector2(Math.round(vec.x / cellSize), Math.round(vec.y / cellSize))
}

export const phaserCoordinatesToGridFloor = (vec: Phaser.Math.Vector2) => {
    return new Phaser.Math.Vector2(Math.floor(vec.x / cellSize), Math.floor(vec.y / cellSize))
}
