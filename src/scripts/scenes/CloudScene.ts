import Cloud from '../objects/Cloud'

export default class CloudScene extends Phaser.Scene {
    clouds!: Phaser.Physics.Arcade.Group

    constructor() {
        super({ key: 'CloudScene' })
    }

    create() {
        this.scene.sendToBack()
        this.clouds = this.physics.add.group()

        const clouds = [
            new Cloud(this),
            new Cloud(this),
            new Cloud(this),
            new Cloud(this),
            new Cloud(this),
            new Cloud(this),
            new Cloud(this)
        ]

        this.clouds.addMultiple(clouds)
        clouds.forEach(cloud => cloud.start())
    }

    update() {
        // test
    }
}
