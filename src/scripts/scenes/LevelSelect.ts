import LevelPreview from '../objects/widgets/LevelPreview'
import MenuItem from '../objects/widgets/MenuItem'

export default class LevelSelectScene extends Phaser.Scene {
    levelScene!: Phaser.Scenes.ScenePlugin
    selectPage: number
    levelPreviews: LevelPreview[]
    folder!: Folder
    currentIndex: number | undefined
    editMode: boolean

    constructor() {
        super({ key: 'LevelSelectScene' })

        this.selectPage = 0
        this.levelPreviews = []
        this.currentIndex = undefined
        this.editMode = false
    }

    async init(folder: Folder) {
        this.folder = folder
        this.levelPreviews = []
        this.selectPage = 0
        this.currentIndex = undefined
        this.editMode = false
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

        const editButton = new MenuItem(this, this.cameras.main.width - 50, 40, 'Edit')
        editButton.setFontSize(48)
        editButton.setAlpha(0.1)
        this.children.add(editButton)

        leftButton.on('pointerdown', () => {
            this.onLeft()
        })

        rightButton.on('pointerdown', () => {
            this.onRight()
        })

        backButton.on('pointerdown', () => {
            this.onBack()
        })

        editButton.on('pointerdown', () => {
            this.editMode = !this.editMode
            editButton.setAlpha(this.editMode ? 1 : 0.1)
        })

        this.input.keyboard.on('keydown', (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                this.onBack()
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
        for (let i = 0; i < this.folder.levels.length; i++) {
            const row = i % 3
            const col = i % 6 >= 3 ? 1 : 0

            const level = this.folder.levels[i]

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
                level.name
            )

            preview.on('pointerdown', () => {
                this.onSelect(i)
            })

            this.children.add(preview)
            this.levelPreviews.push(preview)
        }

        this.refreshSelectPage()

        this.events.removeAllListeners(Phaser.Scenes.Events.WAKE)
        this.events.on(Phaser.Scenes.Events.WAKE, () => {
            if (this.currentIndex !== undefined) {
                this.onSelect(this.currentIndex + 1)
            }
        })
    }

    onSelect(index: number) {
        this.currentIndex = index
        if (index < this.folder.levels.length) {
            this.scene.launch(
                this.editMode ? 'LevelEditorScene' : 'LevelScene',
                this.folder.levels[index].gameLevel
            )
            if (this.editMode) {
                this.scene.stop()
            } else {
                this.scene.sleep()
            }
        }
    }

    onLeft() {
        if (this.selectPage > 0) {
            this.selectPage--
        }
        this.refreshSelectPage()
    }

    onRight() {
        if ((this.selectPage + 1) * 6 < this.folder.levels.length) {
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

    onBack() {
        this.scene.start('FolderSelectScene')
    }
}
