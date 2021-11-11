import BlockStrategy from './BlockStrategy'
import Player from '../Player'

export default class BouncerStrategy extends BlockStrategy {
    handle(player: Player) {
        const d = this.gridCoordinates.subtract(player.gridCoordinates)
        d.rotate(-Math.PI / 2)
        player.setGridDirection(d)
    }

    get gridCoordinates() {
        return this.block.gridCoordinates
    }
}
