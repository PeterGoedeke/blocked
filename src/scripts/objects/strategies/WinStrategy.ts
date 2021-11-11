/* eslint-disable @typescript-eslint/no-empty-function */
import BlockStrategy from './BlockStrategy'
import Player from '../Player'

export default class WinStrategy extends BlockStrategy {
    handle(player: Player) {
        this.block.scene.scene.launch('MenuOverlayScene', {
            wonLevel: true,
            levelScene: this.block.scene.scene,
            series: this.block.scene.series,
            index: this.block.scene.index
        })
        this.block.scene.scene.pause()
    }
}
