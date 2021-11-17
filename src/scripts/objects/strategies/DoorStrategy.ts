/* eslint-disable @typescript-eslint/no-empty-function */
import BlockStrategy from './BlockStrategy'
import Player from '../Player'
import PlatformStrategy from './PlatformStrategy'

export default class DoorStrategy extends BlockStrategy {
    handle(player: Player) {}

    unlock() {
        this.block.strategy = new PlatformStrategy(this.block)
        this.block.setTexture('lock-open')
        this.block.scene.tweens.add({
            targets: this.block,
            scaleX: 0.65,
            scaleY: 0.65,
            duration: 100,
            ease: 'Power2',
            yoyo: true
        })
        this.block.scene.tweens.add({
            targets: this.block,
            alpha: 0.6,
            duration: 100,
            ease: 'Power2'
        })
    }
}
