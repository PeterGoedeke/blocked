import { getBlockTintFromCode } from '../objects/BlockFactory'
import {
    cellSize,
    gridCoordinatesToPhaser,
    phaserCoordinatesToGridFloor
} from '../objects/GridManager'

export default class LevelEditorScene extends Phaser.Scene {
    activeBlockCode: string
    activeBlockImage!: Phaser.GameObjects.Image
    blocks!: Phaser.Physics.Arcade.StaticGroup
    level: Level
    linking: boolean
    lines: Phaser.GameObjects.Line[]

    constructor() {
        super({ key: 'LevelEditorScene' })

        this.activeBlockCode = 'a'
        this.linking = false

        this.level = {
            width: 21,
            height: 12,
            playerStart: {
                x: 10,
                y: 6
            },
            blocks: []
        }

        this.lines = []
    }

    create() {
        const rectangle = this.add.grid(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2,
            this.cameras.main.width,
            this.cameras.main.height,
            cellSize,
            cellSize,
            undefined,
            undefined,
            0xffffff,
            1
            // undefined,
            // 0
        )
        rectangle.setInteractive()

        const blocks = [
            { code: 'a', tint: 0x808080 },
            { code: 'b', tint: 0x52d4ff },
            { code: 'c', tint: 0x0028c9 },
            { code: 'd', tint: 0xffbb1c },
            { code: 'e', tint: 0xfdff6b },
            { code: 'f', tint: 0xff82fd },
            { code: 'g', tint: 0x821800 },
            { code: 'h', tint: 0x734172 },
            { code: 'i', tint: 0xc5eb94 },
            { code: 'j', tint: 0x37fa6b }
        ]

        const player = this.add.image(
            cellSize * this.level.playerStart.x,
            cellSize * this.level.playerStart.y,
            'player'
        )
        player.setOrigin(0, 0)
        player.setDisplaySize(cellSize, cellSize)

        blocks.forEach((block, i) => {
            const image = this.add.image(
                this.cameras.main.width - cellSize / 2,
                cellSize / 4 + 10 + (cellSize / 2) * 1.1 * i,
                'block'
            )
            image.setDisplaySize(cellSize / 2, cellSize / 2)
            image.setTint(block.tint)
            image.setInteractive()
            image.on('pointerdown', () => {
                this.activeBlockCode = block.code
                this.activeBlockImage.setTint(block.tint)
                console.log(block.code)
            })
        })

        this.activeBlockImage = this.add.image(
            this.cameras.main.width - cellSize / 2,
            this.cameras.main.height - cellSize / 4 - 10,
            'block'
        )
        this.activeBlockImage.setDisplaySize(cellSize / 2, cellSize / 2)
        this.activeBlockImage.setTint(0x808080)
        this.activeBlockImage.setInteractive()

        this.activeBlockImage.on('pointerdown', () => {
            this.linking = !this.linking
            this.activeBlockImage.setAlpha(this.linking ? 0.2 : 1)
        })

        this.blocks = this.physics.add.staticGroup()

        rectangle.on('pointerdown', (event: any) => {
            const x: number = event.downX
            const y: number = event.downY

            const click = new Phaser.Math.Vector2(x, y)
            const gridLocation = phaserCoordinatesToGridFloor(click)
            const location = gridCoordinatesToPhaser(gridLocation)

            const block = this.add.image(location.x, location.y, 'block')
            block.setOrigin(0, 0)
            block.setTint(getBlockTintFromCode(this.activeBlockCode))
            block.setDisplaySize(cellSize, cellSize)
            block.setInteractive()

            this.level.blocks.push({
                x: gridLocation.x,
                y: gridLocation.y,
                code: this.activeBlockCode
            })

            block.on('pointerdown', () => {
                if (this.linking) {
                    const linkBlock = this.getBlock(gridLocation.x, gridLocation.y)

                    if (linkBlock.linkCode === undefined) {
                        linkBlock.linkCode = 0
                    } else {
                        linkBlock.linkCode = (linkBlock.linkCode + 1) % 4
                    }
                } else {
                    block.destroy()

                    console.log(block.x, block.y, this.level.blocks)
                    this.level.blocks.splice(
                        this.level.blocks.findIndex(
                            b => b.x === gridLocation.x && b.y === gridLocation.y
                        ),
                        1
                    )
                }
                this.refreshLines()
            })

            console.log(this.level)
            console.log(JSON.stringify(this.level))
            // const block = BlockFactory.getInstance().createBlockFromCode(
            //     this.activeBlockCode,
            //     this,
            //     gridLocation.x,
            //     gridLocation.y
            // )
            // this.blocks.add(block)
        })
    }

    getBlock(x: number, y: number) {
        const block = this.level.blocks.find(b => b.x === x && b.y === y)
        if (!block) {
            throw Error(`Block not found at (${x}, ${y})`)
        }
        return block
    }

    refreshLines() {
        this.lines.forEach(line => line.destroy())
        this.lines = []

        for (let i = 0; i < this.level.blocks.length; i++) {
            const block = this.level.blocks[i]

            if (block.linkCode !== undefined) {
                for (let j = i + 1; j < this.level.blocks.length; j++) {
                    const linkBlock = this.level.blocks[j]

                    if (block.linkCode === linkBlock.linkCode) {
                        const line = this.add.line(
                            0,
                            0,
                            block.x * cellSize + cellSize / 2,
                            block.y * cellSize + cellSize / 2,
                            linkBlock.x * cellSize + cellSize / 2,
                            linkBlock.y * cellSize + cellSize / 2,
                            0xffbdce,
                            1
                        )
                        line.setOrigin(0, 0)
                        this.lines.push(line)
                    }
                }
            }
        }
    }
}
