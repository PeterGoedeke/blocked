import BlockStrategy from './BlockStrategy'
import Player from '../Player'

export default class TeleporterStrategy extends BlockStrategy {
    other?: BlockStrategy

    handle(player: Player) {
        const blockPosition = this.block.gridCoordinates
        const playerPosition = player.gridCoordinates
        const d = playerPosition.subtract(blockPosition)

        if (!this.other) {
            throw Error(`Block at ${this.block.gridCoordinates} is not linked`)
        }
        player.setGridPosition(this.other.blockGridCoordinates().add(d))

        this.block.scene.tweens.add({
            targets: [this.block, this.other.block],
            scaleX: 0.65,
            scaleY: 0.65,
            alpha: 0.8,
            duration: 100,
            ease: 'Power2',
            yoyo: true
        })
    }

    override link(strategy: BlockStrategy) {
        this.other = strategy
    }

    get gridCoordinates() {
        return this.block.gridCoordinates
    }
}
