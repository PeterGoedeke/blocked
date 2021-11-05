/* eslint-disable @typescript-eslint/no-empty-function */
import BlockStrategy from './BlockStrategy'
import Player from '../Player'

export default class NullStrategy extends BlockStrategy {
    handle(player: Player) {}
}
