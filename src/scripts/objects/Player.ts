import { cellSize, gridCoordinatesToPhaser, phaserCoordinatesToGrid } from './GridManager'

export default class Player extends Phaser.Physics.Arcade.Sprite {
    speed: number
    timeout?: number

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'player')

        this.play('player-anim')
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.setCollideWorldBounds(true)

        this.setDisplaySize(cellSize, cellSize)
        this.speed = 500
    }

    get resting() {
        return new Phaser.Math.Vector2(0, 0).subtract(this.body.velocity).length() < 0.5
    }

    get gridCoordinates() {
        return phaserCoordinatesToGrid(this.body.position)
    }

    setGridPosition(vec: Phaser.Math.Vector2) {
        this.setVelocity(0, 0)
        const v = gridCoordinatesToPhaser(vec)
        // console.log(vec)
        setTimeout(() => {
            this.setPosition(v.x, v.y)
        }, 0)
        // console.log(v.x, v.y, cellSize * 9, cellSize * 8)
    }

    setGridDirection(vec: Phaser.Math.Vector2) {
        this.setPosition(Math.round(this.x), Math.round(this.y))
        clearTimeout(this.timeout)
        this.setVelocity(vec.x * this.speed, vec.y * this.speed)

        this.setRotation(vec.angle() - Math.PI / 2)
    }
}
