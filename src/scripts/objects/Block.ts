import BlockStrategy from './strategies/BlockStrategy'
import { cellSize, phaserCoordinatesToGrid } from './GridManager'
import Player from './Player'

export default class Block extends Phaser.Physics.Arcade.Image {
    strategy!: BlockStrategy

    constructor(scene: Phaser.Scene, x: number, y: number, tint: number) {
        super(scene, x, y, 'block')

        scene.add.existing(this)

        this.setOrigin(0, 0)
        this.setDisplaySize(cellSize, cellSize)
        this.setTint(tint)
    }

    setStrategy(strategy: BlockStrategy) {
        this.strategy = strategy
    }

    collide(player: Player) {
        if (this.strategy) {
            this.strategy.handle(player)
        } else {
            throw Error(`Block ${this} at (${this.x}, ${this.y}) does not have a strategy.`)
        }
    }

    get gridCoordinates() {
        return phaserCoordinatesToGrid(this.body.position)
    }
}
