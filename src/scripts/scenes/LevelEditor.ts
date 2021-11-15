import { getBlockData, getBlockList } from '../objects/BlockFactory'
import { levelEditorToPhaser, phaserCoordinatesToLevelEditor } from '../objects/GridManager'
import MenuItem from '../objects/widgets/MenuItem'

export default class LevelEditorScene extends Phaser.Scene {
    activeBlockData: {
        code: string
        texture?: string
        tint: number
    }

    activeBlockImage!: Phaser.GameObjects.Image
    blocks: Phaser.GameObjects.Image[]
    level: GameLevel
    linking: boolean
    lines: Phaser.GameObjects.Line[]
    cellSize: number
    toolbarCellSize: number

    init(data: GameLevel | undefined) {
        if (data && data.blocks) {
            this.level = data
        }
    }

    constructor() {
        super({ key: 'LevelEditorScene' })

        this.activeBlockData = getBlockList()[0]
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

        this.blocks = []
        this.lines = []
        this.cellSize = 56
        this.toolbarCellSize = this.cellSize / 1.5
    }

    create() {
        this.blocks = []
        this.linking = false
        this.lines = []
        this.activeBlockData = getBlockList()[0]

        const backgroundGrid = this.add.grid(
            0,
            0,
            this.cellSize * this.level.width,
            this.cellSize * this.level.height,
            this.cellSize,
            this.cellSize,
            undefined,
            undefined,
            0xffffff,
            1
        )
        backgroundGrid.setOrigin(0, 0)
        backgroundGrid.setInteractive()

        this.level.blocks.forEach(block =>
            this.addBlock(new Phaser.Math.Vector2(block.x, block.y), {
                code: block.code,
                ...getBlockData(block.code)
            })
        )
        this.refreshLines()

        const backButton = new MenuItem(this, this.cameras.main.width - 40, 40, '<', true)
        this.children.add(backButton)

        const clearButton = new MenuItem(
            this,
            this.cameras.main.width - 40,
            this.cameras.main.height - 80,
            '🚫',
            true
        )
        clearButton.setFontSize(40)
        this.children.add(clearButton)

        backButton.on('pointerdown', () => {
            this.onMainMenu()
        })

        clearButton.on('pointerdown', () => {
            this.level.blocks = []
            this.blocks.forEach(block => block.destroy())
            this.blocks = []
            this.refreshLines()
        })

        const player = this.add.image(
            this.cellSize * this.level.playerStart.x,
            this.cellSize * this.level.playerStart.y,
            'player'
        )
        player.setOrigin(0, 0)
        player.setDisplaySize(this.cellSize, this.cellSize)

        getBlockList().forEach((block, i) => {
            const image = this.add.image(
                this.cameras.main.width - this.toolbarCellSize,
                this.cellSize / 4 + 80 + this.toolbarCellSize * 1.1 * i,
                block.texture || 'block'
            )
            image.setDisplaySize(this.toolbarCellSize, this.toolbarCellSize)
            image.setTint(block.tint)
            image.setInteractive()

            image.on('pointerdown', () => {
                this.activeBlockData = block
                this.activeBlockImage.setTint(block.tint)
                this.activeBlockImage.setTexture(block.texture || 'block')
            })
        })

        this.activeBlockImage = this.add.image(
            this.cameras.main.width - this.toolbarCellSize,
            this.cameras.main.height - this.cellSize / 4 - 10,
            'block'
        )

        this.activeBlockImage.setDisplaySize(this.toolbarCellSize, this.toolbarCellSize)
        this.activeBlockImage.setTint(0x808080)
        this.activeBlockImage.setInteractive()

        this.activeBlockImage.on('pointerdown', () => {
            this.linking = !this.linking
            this.activeBlockImage.setAlpha(this.linking ? 0.2 : 1)
        })

        backgroundGrid.on('pointerdown', (event: any) => {
            const click = new Phaser.Math.Vector2(event.downX, event.downY)
            const gridLocation = phaserCoordinatesToLevelEditor(click, this.cellSize)

            const blockData = {
                tint: this.activeBlockData.tint,
                code: this.activeBlockData.code,
                texture: this.activeBlockData.texture
            }

            this.level.blocks.push({
                x: gridLocation.x,
                y: gridLocation.y,
                code: blockData.code
            })

            this.addBlock(gridLocation, blockData)
        })

        this.input.keyboard.on('keydown', (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                this.onMainMenu()
            }
        })
    }

    addBlock(
        gridLocation: Phaser.Math.Vector2,
        blockData: { tint: number; texture?: string; code: string }
    ) {
        const location = levelEditorToPhaser(gridLocation, this.cellSize)

        const block = this.add.image(location.x, location.y, blockData.texture || 'block')
        block.setOrigin(0, 0)
        block.setTint(blockData.tint)
        block.setDisplaySize(this.cellSize, this.cellSize)
        block.setInteractive()

        this.blocks.push(block)

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

                this.level.blocks.splice(
                    this.level.blocks.findIndex(
                        b => b.x === gridLocation.x && b.y === gridLocation.y
                    ),
                    1
                )
            }
            this.refreshLines()
            console.log(JSON.stringify(this.level))
            this.copyTextToClipboard(JSON.stringify(this.level))
        })

        console.log(JSON.stringify(this.level))
        this.copyTextToClipboard(JSON.stringify(this.level))
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
                            block.x * this.cellSize + this.cellSize / 2,
                            block.y * this.cellSize + this.cellSize / 2,
                            linkBlock.x * this.cellSize + this.cellSize / 2,
                            linkBlock.y * this.cellSize + this.cellSize / 2,
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

    onMainMenu() {
        this.scene.start('MainMenuScene')
    }

    fallbackCopyTextToClipboard(text: string) {
        const textArea = document.createElement('textarea')
        textArea.value = text

        // Avoid scrolling to bottom
        textArea.style.top = '0'
        textArea.style.left = '0'
        textArea.style.position = 'fixed'

        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()

        try {
            const successful = document.execCommand('copy')
            const msg = successful ? 'successful' : 'unsuccessful'
            console.log('Fallback: Copying text command was ' + msg)
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err)
        }

        document.body.removeChild(textArea)
    }
    copyTextToClipboard(text: string) {
        if (!navigator.clipboard) {
            this.fallbackCopyTextToClipboard(text)
            return
        }
        navigator.clipboard.writeText(text).then(
            function () {
                console.log('Async: Copying to clipboard was successful!')
            },
            function (err) {
                console.error('Async: Could not copy text: ', err)
            }
        )
    }
}
