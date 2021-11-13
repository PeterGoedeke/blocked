import { getBlockData } from '../BlockFactory'

export default class LevelPreview extends Phaser.GameObjects.Container {
    level: Level
    index: number

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        scale: number,
        level: Level,
        index: number
    ) {
        super(scene, x, y)

        this.level = level
        this.index = index

        for (const block of level?.blocks) {
            const blockData = getBlockData(block.code)

            const image = new Phaser.GameObjects.Image(
                scene,
                block.x * scale,
                block.y * scale,
                blockData.texture || 'block'
            )
            image.setOrigin(0, 0)
            image.setDisplaySize(scale, scale)
            image.setTint(blockData.tint)
            this.add(image)
        }

        const player = new Phaser.GameObjects.Image(
            scene,
            level.playerStart.x * scale,
            level.playerStart.y * scale,
            'player'
        )
        player.setOrigin(0, 0)
        player.setDisplaySize(scale, scale)
        this.add(player)

        const border = new Phaser.GameObjects.Rectangle(
            scene,
            0,
            0,
            level.width * scale,
            level.height * scale
        )
        border.setOrigin(0, 0)
        border.strokeColor = 0x000000
        border.isStroked = true
        border.isFilled = false
        this.add(border)

        const text = new Phaser.GameObjects.Text(
            this.scene,
            scale / 2,
            scale / 4,
            (this.index + 1).toString(),
            {
                fontSize: '32px',
                fontFamily: 'Roboto',
                stroke: 'black',
                strokeThickness: 1.5
            }
        )
        this.add(text)

        this.setInteractive(border, Phaser.Geom.Rectangle.Contains)
    }
}
