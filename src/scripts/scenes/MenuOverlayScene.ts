export default class MenuOverlayScene extends Phaser.Scene {
    levelScene!: Phaser.Scenes.ScenePlugin

    constructor() {
        super({ key: 'MenuOverlayScene' })
    }

    init(levelScene: Phaser.Scenes.ScenePlugin) {
        this.levelScene = levelScene
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

            button.on('pointeroff', () => {
                console.log(button.text)
            })
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
                const scene = this.scene.resume('LevelScene')
                scene.restart()
                // levelScene.restart()
                this.scene.stop()
            } else if (event.key === 'r') {
                this.onRestart()
            }
        })
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
