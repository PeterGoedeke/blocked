import LevelPreview from '../objects/widgets/LevelPreview'
import MenuItem from '../objects/widgets/MenuItem'

export default class FolderSelectScene extends Phaser.Scene {
    selectPage: number
    levelPreviews: LevelPreview[]
    folders!: Folder[]

    constructor() {
        super({ key: 'FolderSelectScene' })

        this.selectPage = 0
        this.levelPreviews = []
    }

    async init(folders: Folder[]) {
        this.folders = folders
        this.levelPreviews = []
    }

    async create() {
        const centreX = this.cameras.main.worldView.x + this.cameras.main.width / 2

        const folderSelectTitle = new MenuItem(this, centreX, 100, 'Stage Select')
        this.children.add(folderSelectTitle)

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
            if (event.key === 'Escape') {
                this.onMainMenu()
            } else if (event.key === 'ArrowLeft') {
                this.onLeft()
            } else if (event.key === 'ArrowRight') {
                this.onRight()
            } else if (!isNaN(Number.parseInt(event.key))) {
                const int = Number.parseInt(event.key)
                const index = int - 1 + this.selectPage * 6
                this.onSelect(index)
            }
        })

        const smallSize = 18
        for (let i = 0; i < this.folders.length; i++) {
            const row = i % 3
            const col = i % 6 >= 3 ? 1 : 0

            const level = this.folders[i].levels[0]

            const boxWidth = level.gameLevel.width + 1
            const boxHeight = level.gameLevel.height + 1

            const preview = new LevelPreview(
                this,
                row * smallSize * boxWidth +
                    (this.cameras.main.width - smallSize * boxWidth * 3) / 2 +
                    boxWidth / 2,
                smallSize * boxHeight - 50 + col * smallSize * boxHeight,
                smallSize,
                level.gameLevel,
                this.folders[i].folderName
            )

            preview.on('pointerdown', () => {
                this.onSelect(i)
            })

            this.children.add(preview)
            this.levelPreviews.push(preview)
        }

        this.refreshSelectPage()
    }

    onSelect(index: number) {
        this.scene.start('LevelSelectScene', {
            folderName: this.folders[index].folderName,
            levels: this.folders[index].levels
        })
    }

    onLeft() {
        if (this.selectPage > 0) {
            this.selectPage--
        }
        this.refreshSelectPage()
    }

    onRight() {
        if ((this.selectPage + 1) * 6 < this.folders.length) {
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
