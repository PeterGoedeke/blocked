import { getAllLevels, getStockLevels } from '../objects/LevelManager'
import MenuItem from '../objects/widgets/MenuItem'

export default class MainMenuScene extends Phaser.Scene {
    levelScene!: Phaser.Scenes.ScenePlugin

    constructor() {
        super({ key: 'MainMenuScene' })
    }

    async create() {
        const centreX = this.cameras.main.worldView.x + this.cameras.main.width / 2
        const quarterY = this.cameras.main.worldView.y + this.cameras.main.height / 4

        const title = new MenuItem(this, centreX, quarterY * 1, 'BLOCKED')
        title.setFontSize(128)

        const levelSelectButton = new MenuItem(this, centreX, quarterY * 2, 'Level Select', true)
        const settingsButton = new MenuItem(this, centreX, quarterY * 2.5, 'Settings', true)
        const levelEditorButton = new MenuItem(this, centreX, quarterY * 3, 'Level Editor', true)

        this.children.add(title)
        this.children.add(levelSelectButton)
        this.children.add(settingsButton)
        this.children.add(levelEditorButton)

        levelSelectButton.on('pointerdown', () => {
            this.onLevelSelect()
        })

        settingsButton.on('pointerdown', () => {
            this.onSettings()
        })

        levelEditorButton.on('pointerdown', () => {
            this.onLevelEditor()
        })

        this.input.keyboard.on('keydown', (event: KeyboardEvent) => {
            if (event.key === 'g' || event.key === 'ArrowLeft') {
                this.onLevelSelect()
            } else if (event.key === 's' || event.key === 'ArrowUp') {
                this.onSettings()
            } else if (event.key === 'ArrowRight') {
                this.onLevelEditor()
            }
        })
    }

    async onLevelSelect() {
        const folders = await getStockLevels()
        this.scene.start('FolderSelectScene', folders)
    }

    onSettings() {
        console.log('unimplemented')
    }

    onLevelEditor() {
        this.scene.start('LevelEditorScene')
    }
}
