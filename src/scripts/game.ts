import 'phaser'
import BackgroundScene from './scenes/BackgroundScene'
import CloudScene from './scenes/CloudScene'
import FolderSelectScene from './scenes/FolderSelect'
import LevelEditorScene from './scenes/LevelEditor'
import LevelScene from './scenes/LevelScene'
import LevelSelectScene from './scenes/LevelSelect'
import MainMenuScene from './scenes/MainMenu'
import MenuOverlayScene from './scenes/MenuOverlay'
import PreloadScene from './scenes/preloadScene'

import SwipePlugin from 'phaser3-swipe-plugin'

const DEFAULT_WIDTH = 1260
const DEFAULT_HEIGHT = 720

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    backgroundColor: '#bdfbff',
    scale: {
        parent: 'phaser-game',
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT
    },
    dom: {
        createContainer: true
    },
    scene: [
        PreloadScene,
        LevelScene,
        MenuOverlayScene,
        CloudScene,
        MainMenuScene,
        LevelSelectScene,
        LevelEditorScene,
        BackgroundScene,
        FolderSelectScene
    ],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    plugins: {
        global: [
            {
                key: 'SwipePlugin',
                plugin: SwipePlugin,
                start: true,
                data: {
                    offset: 10
                }
            }
        ]
    }
}

window.addEventListener('load', () => {
    const game = new Phaser.Game(config)
})
