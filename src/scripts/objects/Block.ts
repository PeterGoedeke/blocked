import BlockStrategy from './strategies/BlockStrategy'
import { cellSize, phaserCoordinatesToGrid } from './GridManager'
import Player from './Player'
import LevelScene from '../scenes/LevelScene'

export default class Block extends Phaser.Physics.Arcade.Image {
    strategy!: BlockStrategy
    scene: LevelScene

    constructor(scene: LevelScene, x: number, y: number, tint: number) {
        super(scene, x, y, 'block')

        this.scene = scene
        scene.add.existing(this)

        this.setDisplaySize(cellSize, cellSize)
        this.setTint(tint)
    }

    setStrategy(strategy: BlockStrategy) {
        this.strategy = strategy
        this.setTexture(strategy.texture)
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
