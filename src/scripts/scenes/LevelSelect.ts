import LevelPreview from '../objects/widgets/LevelPreview'
import MenuItem from '../objects/widgets/MenuItem'

export default class LevelSelectScene extends Phaser.Scene {
    levelScene!: Phaser.Scenes.ScenePlugin
    selectPage: number
    levelPreviews: LevelPreview[]
    levels!: Level[]

    constructor() {
        super({ key: 'LevelSelectScene' })

        this.selectPage = 0
        this.levelPreviews = []
    }

    async init(levels: Level[]) {
        this.levels = levels
        this.levelPreviews = []
        this.selectPage = 0
    }

    async create() {
        const centreX = this.cameras.main.worldView.x + this.cameras.main.width / 2

        const levelSelectTitle = new MenuItem(this, centreX, 100, 'Level Select')
        this.children.add(levelSelectTitle)

        const leftButton = new MenuItem(this, 25, 407, '<', true)
        const rightButton = new MenuItem(this, this.cameras.main.width - 23, 407, '>', true)
        this.children.add(leftButton)
        this.children.add(rightButton)

        const backButton = new MenuItem(this, 40, 40, '<', true)
        backButton.setFontSize(64 + 32)
        this.children.add(backButton)

        leftButton.on('pointerdown', () => {
            this.onLeft()
        })

        rightButton.on('pointerdown', () => {
            this.onRight()
        })

        backButton.on('pointerdown', () => {
            this.onMainMenu()
        })

        this.input.keyboard.on('keydown', (event: KeyboardEvent) => {
            console.log(event.key)
            if (event.key === 'Escape') {
                this.onMainMenu()
            } else if (event.key === 'ArrowLeft') {
                this.onLeft()
            } else if (event.key === 'ArrowRight') {
                this.onRight()
            } else if (!isNaN(Number.parseInt(event.key))) {
                const int = Number.parseInt(event.key)
                const index = int - 1 + this.selectPage * 6
                this.scene.start('LevelScene', {
                    series: 'stock',
                    index,
                    level: this.levels[index]
                })
            }
        })

        const smallSize = 18
        for (let i = 0; i < this.levels.length; i++) {
            const row = i % 3
            const col = i % 6 >= 3 ? 1 : 0

            const level = this.levels[i]

            const boxWidth = level.width + 1
            const boxHeight = level.height + 1

            const preview = new LevelPreview(
                this,
                row * smallSize * boxWidth +
                    (this.cameras.main.width - smallSize * boxWidth * 3) / 2 +
                    boxWidth / 2,
                smallSize * boxHeight - 50 + col * smallSize * boxHeight,
                smallSize,
                level,
                i
            )

            preview.on('pointerdown', () => {
                this.scene.start('LevelScene', {
                    series: 'stock',
                    index: i,
                    level
                })
            })

            this.children.add(preview)
            this.levelPreviews.push(preview)
        }

        this.refreshSelectPage()
    }

    onLeft() {
        if (this.selectPage > 0) {
            this.selectPage--
        }
        this.refreshSelectPage()
    }

    onRight() {
        if (this.selectPage < Math.floor(this.levels.length / 6)) {
            this.selectPage++
        }
        this.refreshSelectPage()
    }

    refreshSelectPage() {
        this.levelPreviews.forEach(preview => preview.setVisible(false))
        this.levelPreviews
            .slice(this.selectPage * 6, (this.selectPage + 1) * 6)
            .forEach(preview => preview.setVisible(true))
    }

    onMainMenu() {
        this.scene.start('MainMenuScene')
    }
}
