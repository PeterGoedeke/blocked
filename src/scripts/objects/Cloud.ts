export default class Cloud extends Phaser.Physics.Arcade.Sprite {
    scene: Phaser.Scene

    constructor(scene: Phaser.Scene) {
        super(scene, -scene.cameras.main.width * 2, 0, 'cloud')

        this.scene = scene
        scene.add.existing(this)

        this.setDisplaySize(100, 20)
        this.setAlpha(0.3)
    }

    start() {
        this.restart()
        this.setX(this.x - this.scene.cameras.main.width)
    }

    preUpdate(time: number, delta: number) {
        super.preUpdate(time, delta)

        if (this.x < -this.width * 1.5) {
            this.restart()
        }
    }

    restart() {
        let unit = this.randomIntFromInterval(0, 2)

        if (unit === 0) unit = 1

        this.setVelocityX(-unit * 10)

        this.setDisplaySize(((unit * 5) / 2) * 50, unit * 50)

        this.setY(
            this.randomIntFromInterval(
                (unit * 50) / 2 + 10,
                this.scene.cameras.main.height - (unit * 50) / 2 - 10
            )
        )

        this.setX(
            this.randomIntFromInterval(
                this.scene.cameras.main.width,
                this.scene.cameras.main.width * 2
            )
        )

        this.setAlpha(unit === 2 ? 0.65 : 0.3)
    }

    randomIntFromInterval(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}
