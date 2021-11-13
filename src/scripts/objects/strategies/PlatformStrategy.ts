import BlockStrategy from './BlockStrategy'
import Player from '../Player'

export default class PlatformStrategy extends BlockStrategy {
    handle(player: Player) {
        setTimeout(() => {
            this.block.destroy()
            // this.block.body.destroy()
            this.block.setVisible(false)
        }, 300)

        const coords = this.gridCoordinates
        const timeout = setTimeout(() => {
            if (player.resting) {
                const d = coords.subtract(player.gridCoordinates)
                player.setGridDirection(d)
            }
        }, 300)

        this.block.scene.tweens.add({
            targets: this.block,
            alpha: 0,
            duration: 300,
            ease: 'Power2'
        })

        player.timeout = timeout
    }

    get gridCoordinates() {
        return this.block.gridCoordinates
    }
}
