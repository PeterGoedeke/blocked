import BlockStrategy from './BlockStrategy'
import Player from '../Player'
import DoorStrategy from './DoorStrategy'
import Block from '../Block'

export default class KeyStrategy extends BlockStrategy {
    door?: DoorStrategy

    handle(player: Player) {
        if (!this.door) {
            throw Error(`Key at ${this.block.gridCoordinates} is not linked`)
        }
        this.door.unlock()
        this.block.scene.tweens.add({
            targets: this.door.block,
            scaleX: 0.65,
            scaleY: 0.65,
            alpha: 0.8,
            duration: 100,
            ease: 'Power2',
            yoyo: true
        })
        this.block.destroy()
        this.block.setVisible(false)
    }

    override link(strategy: DoorStrategy) {
        this.door = strategy
    }

    get gridCoordinates() {
        return this.block.gridCoordinates
    }
}
