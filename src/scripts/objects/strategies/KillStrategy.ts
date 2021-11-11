/* eslint-disable @typescript-eslint/no-empty-function */
import BlockStrategy from './BlockStrategy'
import Player from '../Player'

export default class KillStrategy extends BlockStrategy {
    handle(player: Player) {
        this.block.scene.scene.restart()
    }
}
