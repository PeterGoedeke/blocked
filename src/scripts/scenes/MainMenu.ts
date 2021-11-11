export default class MainMenuScene extends Phaser.Scene {
    levelScene!: Phaser.Scenes.ScenePlugin

    constructor() {
        super({ key: 'MainMenuScene' })
    }

    create() {
        const centreX = this.cameras.main.worldView.x + this.cameras.main.width / 2
        const quarterY = this.cameras.main.worldView.y + this.cameras.main.height / 4

        const levelSelectButton = this.add.text(centreX, quarterY, 'Level select')
        const settingsButton = this.add.text(centreX, quarterY + quarterY / 2, 'Settings')
        const levelEditorButton = this.add.text(centreX, quarterY * 2, 'Level Editor')

        const buttons = [levelSelectButton, settingsButton, levelEditorButton]

        buttons.forEach(button => {
            button.setOrigin(0.5)
            button.setAlpha(0.9)
            button.setBackgroundColor('darkgrey')
            button.setFontSize(48)
            button.setInteractive()
        })

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
            console.log(event.key)
            if (event.key === 'g') {
                this.onLevelSelect()
            } else if (event.key === 's') {
                this.onSettings()
            }
        })
    }

    onLevelSelect() {
        this.scene.start('LevelSelectScene')
    }

    onSettings() {
        console.log('unimplemented')
    }

    onLevelEditor() {
        this.scene.start('LevelEditorScene')
    }
}
