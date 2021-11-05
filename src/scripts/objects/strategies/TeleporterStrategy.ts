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
    }

    override link(strategy: BlockStrategy) {
        this.other = strategy
    }

    get gridCoordinates() {
        return this.block.gridCoordinates
    }
}
