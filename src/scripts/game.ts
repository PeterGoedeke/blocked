import 'phaser'
import CloudScene from './scenes/CloudScene'
import LevelScene from './scenes/LevelScene'
import PreloadScene from './scenes/preloadScene'

const DEFAULT_WIDTH = 1280
const DEFAULT_HEIGHT = 720

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#ffffff',
    scale: {
        parent: 'phaser-game',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT
    },
        CloudScene,
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
