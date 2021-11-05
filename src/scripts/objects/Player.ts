import { cellSize, gridCoordinatesToPhaser, phaserCoordinatesToGrid } from './GridManager'

export default class Player extends Phaser.Physics.Arcade.Sprite {
    speed: number
    timeout?: number
    levelOrigin: Phaser.Math.Vector2

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'player')

        // this.play('player-anim')
        this.levelOrigin = phaserCoordinatesToGrid(new Phaser.Math.Vector2(x, y))
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.setCollideWorldBounds(true)

        this.setOrigin(0, 0)
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
        console.log('call')
        this.setVelocity(0, 0)
        const v = gridCoordinatesToPhaser(vec)
        // console.log(vec)
        setTimeout(() => {
            this.setPosition(v.x, v.y)
        }, 0)
        // console.log(v.x, v.y, cellSize * 9, cellSize * 8)
    }

    setGridDirection(vec: Phaser.Math.Vector2) {
        clearTimeout(this.timeout)
        this.setVelocity(vec.x * this.speed, vec.y * this.speed)
    }

    sendToStart() {
        console.log(this.levelOrigin)
        this.setGridPosition(this.levelOrigin)
    }
}