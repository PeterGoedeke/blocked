export const cellSize = 60

export const gridCoordinatesToPhaser = (vec: Phaser.Math.Vector2, size = cellSize) => {
    return new Phaser.Math.Vector2(vec.x * size, vec.y * size)
}

export const phaserCoordinatesToGrid = (vec: Phaser.Math.Vector2) => {
    return new Phaser.Math.Vector2(Math.round(vec.x / cellSize), Math.round(vec.y / cellSize))
}

export const phaserCoordinatesToLevelEditor = (vec: Phaser.Math.Vector2, size: number) => {
    return new Phaser.Math.Vector2(Math.floor(vec.x / size), Math.floor(vec.y / size))
}
