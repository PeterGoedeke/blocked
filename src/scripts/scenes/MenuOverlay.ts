import MenuItem from '../objects/widgets/MenuItem'

interface InitData {
    wonLevel: boolean
    levelScene: Phaser.Scenes.ScenePlugin
}

export default class MenuOverlayScene extends Phaser.Scene {
    levelScene!: Phaser.Scenes.ScenePlugin
    wonLevel!: boolean

    constructor() {
        super({ key: 'MenuOverlayScene' })
    }

    init(data: InitData) {
        this.levelScene = data.levelScene
        this.wonLevel = data.wonLevel
    }

    create() {
        const centreX = this.cameras.main.worldView.x + this.cameras.main.width / 2
        const quarterY = this.cameras.main.worldView.y + this.cameras.main.height / 4

        const nextLevelButton = new MenuItem(this, centreX, quarterY, 'Next Level', true)
        const restartLevelButton = new MenuItem(
            this,
            centreX,
            quarterY * 1.5,
            'Restart Level',
            true
        )
        const levelSelectButton = new MenuItem(this, centreX, quarterY * 2, 'Level Select', true)
        const mainMenuButton = new MenuItem(this, centreX, quarterY * 2.5, 'Main Menu', true)

        this.children.add(nextLevelButton)
        this.children.add(restartLevelButton)
        this.children.add(levelSelectButton)
        this.children.add(mainMenuButton)

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
            if (event.key === 'Escape') {
                if (!this.wonLevel) {
                    this.scene.resume('LevelScene')
                    this.scene.stop()
                }
            } else if (event.key === 'r' || event.key === 'ArrowUp') {
                this.onRestart()
            } else if (event.key === 'n' || event.key === 'ArrowLeft') {
                this.onNextLevel()
            } else if (event.key === 'ArrowRight' || event.key === 's') {
                this.onLevelSelect()
            } else if (event.key === 'ArrowDown' || event.key === 'm') {
                this.onMainMenu()
            }
        })
    }

    async onNextLevel() {
        this.scene.wake('LevelSelectScene')
        this.scene.stop()
        this.levelScene.stop()
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
}
