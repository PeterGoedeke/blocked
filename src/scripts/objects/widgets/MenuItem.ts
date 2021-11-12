export default class MenuItem extends Phaser.GameObjects.Text {
    constructor(scene: Phaser.Scene, x: number, y: number, text: string, hoverEffect = false) {
        super(scene, x, y, text, {
            fontFamily: 'Roboto',
            fontSize: '64px',
            stroke: 'black',
            strokeThickness: 2
        })

        this.setInteractive(
            new Phaser.Geom.Rectangle(0, 0, this.width, this.height),
            Phaser.Geom.Rectangle.Contains
        )

        if (hoverEffect) {
            this.on('pointerover', () => {
                this.setDisplaySize(this.width * 1.1, this.height * 1.1)
                this.setAlpha(1)
            })
            this.on('pointerout', () => {
                this.setDisplaySize(this.width / 1.1, this.height / 1.1)
                this.setAlpha(0.8)
            })
        }

        this.setAlpha(0.8)
        this.setOrigin(0.5)
    }
}
