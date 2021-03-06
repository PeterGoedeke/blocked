import BlockStrategy from './BlockStrategy'
import Player from '../Player'

export default class SwapperStrategy extends BlockStrategy {
    handle(player: Player) {
        const d = this.gridCoordinates.subtract(player.gridCoordinates)
        player.setGridPosition(this.gridCoordinates.add(d))

        if (!this.block.hasTween) {
            this.block.scene.tweens.add({
                targets: this.block,
                scaleX: '*=1.1',
                scaleY: '*=1.1',
                alpha: 0.8,
                duration: 100,
                ease: 'Power2',
                yoyo: true
            })
        }
    }

    get gridCoordinates() {
        return this.block.gridCoordinates
    }
}
