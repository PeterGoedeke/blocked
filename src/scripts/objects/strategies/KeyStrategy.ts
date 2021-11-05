import BlockStrategy from './BlockStrategy'
import Player from '../Player'
import DoorStrategy from './DoorStrategy'

export default class KeyStrategy extends BlockStrategy {
    door?: DoorStrategy

    handle(player: Player) {
        if (!this.door) {
            throw Error(`Key at ${this.block.gridCoordinates} is not linked`)
        }
        this.door.unlock()
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
