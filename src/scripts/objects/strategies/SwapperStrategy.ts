import BlockStrategy from './BlockStrategy'
import Player from '../Player'

export default class SwapperStrategy extends BlockStrategy {
    handle(player: Player) {
        const d = this.gridCoordinates.subtract(player.gridCoordinates)
        player.setGridPosition(this.gridCoordinates.add(d))
    }

    get gridCoordinates() {
        return this.block.gridCoordinates
    }
}
