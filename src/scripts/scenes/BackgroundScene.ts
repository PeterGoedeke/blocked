export default class BackgroundScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BackgroundScene' })
    }

    create() {
        this.scene.sendToBack()

        const background = this.add.image(0, 0, 'backdrop')
        background.setOrigin(0, 0)
        background.setDisplaySize(this.cameras.main.width, this.cameras.main.height)

        const music = this.sound.add('music', {
            mute: false,
            volume: 0.3,
            loop: true
        })
        music.play()
    }

    update() {
        // test
    }
}
