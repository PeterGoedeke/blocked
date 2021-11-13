export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloadScene' })
    }

    preload() {
        this.load.image('block', 'assets/img/block.png')
        this.load.image('player', 'assets/img/player.png')
        this.load.image('cloud', 'assets/img/cloud.png')
        this.load.image('key', 'assets/img/key.png')
        this.load.image('backdrop', 'assets/img/backdrop.png')

        this.load.audio('music', 'assets/music/b.mp3')
    }

    create() {
        this.anims.create({
            key: 'player-anim',
            frames: this.anims.generateFrameNumbers('player', {
                start: 1,
                end: 1
            }),
            frameRate: 1,
            repeat: -1
        })

        this.scene.start('MainMenuScene')
        // this.scene.start('LevelSelectScene')
        // this.scene.start('LevelEditorScene')
        this.scene.start('CloudScene')
        this.scene.start('BackgroundScene')

        /**
         * This is how you would dynamically import the mainScene class (with code splitting),
         * add the mainScene to the Scene Manager
         * and start the scene.
         * The name of the chunk would be 'mainScene.chunk.js
         * Find more about code splitting here: https://webpack.js.org/guides/code-splitting/
         */
        // let someCondition = true
        // if (someCondition)
        //   import(/* webpackChunkName: "mainScene" */ './mainScene').then(mainScene => {
        //     this.scene.add('MainScene', mainScene.default, true)
        //   })
        // else console.log('The mainScene class will not even be loaded by the browser')
    }
}
