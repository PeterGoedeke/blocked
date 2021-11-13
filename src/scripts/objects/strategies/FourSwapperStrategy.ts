import BlockStrategy from './BlockStrategy'
import Player from '../Player'

export default class FourSwapperStrategy extends BlockStrategy {
    handle(player: Player) {
        const d = this.gridCoordinates.subtract(player.gridCoordinates)
        d.rotate(-Math.PI / 2)
        player.setGridPosition(this.gridCoordinates.add(d))

        this.block.scene.tweens.add({
            targets: this.block,
            scaleX: 0.65,
            scaleY: 0.65,
            alpha: 0.8,
            duration: 100,
            ease: 'Power2',
            yoyo: true
        })
    }

    get gridCoordinates() {
        return this.block.gridCoordinates
    }
}
