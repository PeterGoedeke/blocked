import BlockStrategy from './BlockStrategy'
import Player from '../Player'

export default class PlatformStrategy extends BlockStrategy {
    handle(player: Player) {
        setTimeout(() => {
            this.block.body.destroy()
            this.block.setVisible(false)
        }, 300)

        const timeout = setTimeout(() => {
            if (player.resting) {
                const d = this.gridCoordinates.subtract(player.gridCoordinates)
                player.setGridDirection(d)
            }
        }, 300)

        player.timeout = timeout
    }

    get gridCoordinates() {
        return this.block.gridCoordinates
    }
}
