import { getNextLevel } from '../objects/LevelManager'
import MenuItem from '../objects/widgets/MenuItem'

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
            console.log(event.key)
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
