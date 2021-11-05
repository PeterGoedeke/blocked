/* eslint-disable @typescript-eslint/no-empty-function */
import BlockStrategy from './BlockStrategy'
import Player from '../Player'
import PlatformStrategy from './PlatformStrategy'

export default class DoorStrategy extends BlockStrategy {
    handle(player: Player) {}

    unlock() {
        this.block.strategy = new PlatformStrategy(this.block)
        this.block.setTint(0xc98fc8)
    }
}
