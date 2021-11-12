import 'phaser'
import BackgroundScene from './scenes/BackgroundScene'
import CloudScene from './scenes/CloudScene'
import LevelEditorScene from './scenes/LevelEditor'
import LevelScene from './scenes/LevelScene'
import LevelSelectScene from './scenes/LevelSelect'
import MainMenuScene from './scenes/MainMenu'
import MenuOverlayScene from './scenes/MenuOverlayScene'
import PreloadScene from './scenes/preloadScene'

const DEFAULT_WIDTH = 1260
const DEFAULT_HEIGHT = 720

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#bdfbff',
    scale: {
        parent: 'phaser-game',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT
    },
    scene: [
        PreloadScene,
        LevelScene,
        MenuOverlayScene,
        CloudScene,
        MainMenuScene,
        LevelSelectScene,
        LevelEditorScene,
        BackgroundScene
    ],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
}

window.addEventListener('load', () => {
    const game = new Phaser.Game(config)
})
