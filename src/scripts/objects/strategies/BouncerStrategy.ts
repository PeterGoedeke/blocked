import BlockStrategy from './BlockStrategy'
import Player from '../Player'
import { cellSize } from '../GridManager'

export default class BouncerStrategy extends BlockStrategy {
    handle(player: Player) {
        const d = this.gridCoordinates.subtract(player.gridCoordinates)
        d.rotate(-Math.PI / 2)
        player.setGridDirection(new Phaser.Math.Vector2(Math.round(d.x), Math.round(d.y)))

        setTimeout(() => {
            player.setX(Math.floor(player.x / cellSize) * cellSize + cellSize / 2)
            player.setY(Math.floor(player.y / cellSize) * cellSize + cellSize / 2)
        }, 0)

        if (!this.block.hasTween) {
            this.block.scene.tweens.add({
                targets: this.block,
                scaleX: 0.7,
                scaleY: 0.7,
                duration: 70,
                ease: 'Power2',
                yoyo: true
            })
        }
    }

    get gridCoordinates() {
        return this.block.gridCoordinates
    }
}
