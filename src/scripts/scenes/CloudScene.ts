import Cloud from '../objects/Cloud'

export default class CloudScene extends Phaser.Scene {
    clouds!: Phaser.Physics.Arcade.Group

    constructor() {
        super({ key: 'CloudScene' })
    }

    create() {
        this.scene.sendToBack()
        this.clouds = this.physics.add.group()

        const clouds = Array(20)
            .fill(0)
            .map(_ => new Cloud(this))

        this.clouds.addMultiple(clouds)
        clouds.forEach(cloud => cloud.start())

        for (let i = 10; i < clouds.length; i++) {
            clouds[i].setX(clouds[i].x + this.cameras.main.width)
        }
    }

    update() {
        // test
    }
}
