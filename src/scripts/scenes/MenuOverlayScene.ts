import { getNextLevel } from '../objects/LevelManager'

interface InitData {
    wonLevel: boolean
    levelScene: Phaser.Scenes.ScenePlugin
    series: string
    index: number
}

export default class MenuOverlayScene extends Phaser.Scene {
    levelScene!: Phaser.Scenes.ScenePlugin
    wonLevel!: boolean
    series!: string
    index!: number

    constructor() {
        super({ key: 'MenuOverlayScene' })
    }

    init(data: InitData) {
        this.levelScene = data.levelScene
        this.wonLevel = data.wonLevel
        this.series = data.series
        this.index = data.index

        console.log(this.wonLevel)
    }

    create() {
        const centreX = this.cameras.main.worldView.x + this.cameras.main.width / 2
        const quarterY = this.cameras.main.worldView.y + this.cameras.main.height / 4

        const nextLevelButton = this.add.text(centreX, quarterY, 'Next level')
        const restartLevelButton = this.add.text(centreX, quarterY + quarterY / 2, 'Restart level')
        const levelSelectButton = this.add.text(centreX, quarterY * 2, 'Level select')
        const mainMenuButton = this.add.text(centreX, quarterY * 2 + quarterY / 2, 'Main menu')

        const buttons = [nextLevelButton, restartLevelButton, levelSelectButton, mainMenuButton]

        buttons.forEach(button => {
            button.setOrigin(0.5)
            button.setAlpha(0.9)
            button.setBackgroundColor('darkgrey')
            button.setFontSize(48)
            button.setInteractive()
        })

        nextLevelButton.on('pointerdown', () => {
            this.onNextLevel()
        })

        restartLevelButton.on('pointerdown', () => {
            this.onRestart()
        })

        levelSelectButton.on('pointerdown', () => {
            this.onLevelSelect()
        })

        mainMenuButton.on('pointerdown', () => {
            this.onMainMenu()
        })

        this.input.keyboard.on('keydown', (event: KeyboardEvent) => {
            console.log(event.key)
            if (event.key === 'Escape') {
                if (!this.wonLevel) {
                    this.scene.resume('LevelScene')
                    this.scene.stop()
                }
            } else if (event.key === 'r' || event.key === 'ArrowDown') {
                this.onRestart()
            } else if (event.key === 'n' || event.key === 'ArrowUp') {
                this.onNextLevel()
            }
        })
    }

    async onNextLevel() {
        const level = await getNextLevel(this.series, this.index)

        this.levelScene.stop()

        if (level) {
            this.scene.start('LevelScene', {
                series: this.series,
                index: this.index + 1,
                level
            })
        } else {
            this.scene.start('MainMenuScene')
        }
    }

    onRestart() {
        this.scene.resume('LevelScene')
        this.levelScene.restart()
        this.scene.stop()
    }

    onLevelSelect() {
        this.scene.start('LevelSelectScene')
        this.levelScene.stop()
    }

    onMainMenu() {
        this.scene.start('MainMenuScene')
        this.levelScene.stop()
    }

    update() {
        // test
    }
}
