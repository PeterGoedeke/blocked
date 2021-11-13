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

        this.block.scene.tweens.add({
            targets: this.block,
            scaleX: 0.7,
            scaleY: 0.7,
            duration: 70,
            ease: 'Power2',
            yoyo: true
        })

        this.block.scene.tweens.add({
            targets: this.block,
            alpha: 0.2,
            duration: 500,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1,
            delay: 70
        })

        this.block.scene.active = false
        // this.block.scene.scene.pause()
    }
}
