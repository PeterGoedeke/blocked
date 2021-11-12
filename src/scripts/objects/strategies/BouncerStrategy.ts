import BlockStrategy from './BlockStrategy'
import Player from '../Player'
import { cellSize } from '../GridManager'

export default class BouncerStrategy extends BlockStrategy {
    handle(player: Player) {
        const d = this.gridCoordinates.subtract(player.gridCoordinates)
        d.rotate(-Math.PI / 2)
        player.setGridDirection(d)

        setTimeout(() => {
            player.setX(Math.round(player.x / cellSize) * cellSize)
            player.setY(Math.round(player.y / cellSize) * cellSize)
        }, 0)
    }

    get gridCoordinates() {
        return this.block.gridCoordinates
    }
}
