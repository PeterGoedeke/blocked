export default class PhaserLogo extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'block')
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.setTint(0xe69b50)
        this.setCollideWorldBounds(true)
            .setBounce(0.6)
            .setInteractive()
            .on('pointerdown', () => {
                this.setVelocityY(-400)
            })
    }
}
