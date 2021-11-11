export default class Cloud extends Phaser.Physics.Arcade.Sprite {
    scene: Phaser.Scene

    constructor(scene: Phaser.Scene) {
        super(scene, scene.cameras.main.width * 2, 0, 'cloud')

        this.scene = scene
        scene.add.existing(this)

        this.setOrigin(0, 0)
        this.setDisplaySize(100, 20)
        this.setAlpha(0.3)
    }

    start() {
        this.restart()
    }

    preUpdate(time: number, delta: number) {
        super.preUpdate(time, delta)

        if (this.x > this.scene.cameras.main.width) {
            this.restart()
        }
    }

    restart() {
        console.log('yeet')
        this.setVelocityX(this.randomIntFromInterval(30, 300))

        const unit = this.randomIntFromInterval(20, 60)

        this.setDisplaySize((unit * 5) / 2, unit)
        this.setY(this.randomIntFromInterval(unit * 10, this.scene.cameras.main.height - unit * 10))
        this.setX(this.randomIntFromInterval(-this.scene.cameras.main.width, -unit * 50))
        this.setAlpha(this.randomIntFromInterval(1, 8) / 10)
    }

    randomIntFromInterval(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}
