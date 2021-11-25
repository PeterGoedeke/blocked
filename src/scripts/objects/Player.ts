import LevelScene from '../scenes/LevelScene'

export default class Player extends Phaser.Physics.Arcade.Sprite {
    speed: number
    timeout?: number
    scene: LevelScene

    constructor(scene: LevelScene, x: number, y: number) {
        super(scene, x, y, 'player')

        this.scene = scene

        this.play('player-anim')
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.setCollideWorldBounds(true)

        this.speed = this.scene.gridManager.cellSize * 10
    }

    get resting() {
        return new Phaser.Math.Vector2(0, 0).subtract(this.body.velocity).length() < 0.5
    }

    get gridCoordinates() {
        return this.scene.gridManager.phaserToGrid(this.body.position)
    }

    setGridPosition(vec: Phaser.Math.Vector2) {
        this.setVelocity(0, 0)
        const v = this.scene.gridManager.gridToPhaser(vec)
        // console.log(vec)
        setTimeout(() => {
            this.setPosition(Math.round(v.x), Math.round(v.y))
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
