import BlockStrategy from './BlockStrategy'
import Player from '../Player'
import DoorStrategy from './DoorStrategy'
import Block from '../Block'

export default class KeyStrategy extends BlockStrategy {
    door?: DoorStrategy

    constructor(block: Block, texture?: string) {
        super(block, texture)

        this.block.scene.tweens.add({
            targets: this.block,
            scaleX: '*=0.8',
            scaleY: '*=0.8',
            alpha: 1,
            ease: Phaser.Math.Easing.Sine.InOut,
            repeat: -1,
            yoyo: true,
            duration: 800
        })
        // this.block.setDisplaySize(
        //     this.block.scene.gridManager.cellSize * 0.8,
        //     this.block.scene.gridManager.cellSize * 0.8
        // )
    }

    handle(player: Player) {
        if (!this.door) {
            throw Error(`Key at ${this.block.gridCoordinates} is not linked`)
        }
        this.door.unlock()
        this.block.destroy()
        this.block.setVisible(false)
    }

    override link(strategy: DoorStrategy) {
        this.block.setAlpha(0.7)
        this.door = strategy
    }

    get gridCoordinates() {
        return this.block.gridCoordinates
    }
}
