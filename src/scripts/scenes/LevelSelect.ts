import { getLevel } from '../objects/LevelManager'

export default class LevelSelectScene extends Phaser.Scene {
    levelScene!: Phaser.Scenes.ScenePlugin

    constructor() {
        super({ key: 'LevelSelectScene' })
    }

    async create() {
        const centreX = this.cameras.main.worldView.x + this.cameras.main.width / 2
        const quarterY = this.cameras.main.worldView.y + this.cameras.main.height / 4

        const levelSelectButton = this.add.text(centreX, quarterY, 'Level sjjelect')
        const settingsButton = this.add.text(centreX, quarterY + quarterY / 2, 'Settings')

        const buttons = [levelSelectButton, settingsButton]

        buttons.forEach(button => {
            button.setOrigin(0.5)
            button.setAlpha(0.9)
            button.setBackgroundColor('darkgrey')
            button.setFontSize(48)
            button.setInteractive()

            button.on('pointeroff', () => {
                console.log(button.text)
            })
        })

        levelSelectButton.on('pointerdown', () => {
            this.onLevelSelect()
        })

        settingsButton.on('pointerdown', () => {
            this.onSettings()
        })

        this.input.keyboard.on('keydown', (event: KeyboardEvent) => {
            console.log(event.key)
            if (event.key === 'g') {
                this.onLevelSelect()
            } else if (event.key === 's') {
                this.onSettings()
            }
        })

        const level = await getLevel('stock', 0)
        if (!level) {
            console.log('no remaining levels')
        } else {
            this.scene.start('LevelScene', {
                series: 'stock',
                index: 0,
                level
            })
        }
    }

    onLevelSelect() {
        this.scene.start('LevelSelectScene')
    }

    onSettings() {
        console.log('unimplemented')
    }
}
