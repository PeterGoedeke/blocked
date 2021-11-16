import client from '../client'
import MenuItem from '../objects/widgets/MenuItem'

export default class MainMenuScene extends Phaser.Scene {
    levelScene!: Phaser.Scenes.ScenePlugin
    form!: Phaser.GameObjects.DOMElement
    loginButton!: MenuItem
    username!: MenuItem

    constructor() {
        super({ key: 'MainMenuScene' })
    }

    async create() {
        const centreX = this.cameras.main.worldView.x + this.cameras.main.width / 2
        const quarterY = this.cameras.main.worldView.y + this.cameras.main.height / 4

        const title = new MenuItem(this, centreX, quarterY * 0.5, 'BLOCKED')
        title.setFontSize(128)

        this.username = new MenuItem(
            this,
            this.cameras.main.width - 200,
            this.cameras.main.height - 30,
            'Not logged in'
        )
        this.username.setFontSize(32)

        const levelSelectButton = new MenuItem(this, centreX, quarterY * 1.5, 'Level Select', true)
        const communityLevelsButton = new MenuItem(
            this,
            centreX,
            quarterY * 2,
            'Community Levels',
            true
        )
        const levelEditorButton = new MenuItem(this, centreX, quarterY * 2.5, 'Level Editor', true)
        this.loginButton = new MenuItem(this, centreX, quarterY * 3, 'Login', true)
        const myLevelsButton = new MenuItem(this, centreX, quarterY * 3.5, 'My Levels', true)

        this.children.add(title)
        this.children.add(this.username)
        this.children.add(levelSelectButton)
        this.children.add(communityLevelsButton)
        this.children.add(levelEditorButton)
        this.children.add(this.loginButton)
        this.children.add(myLevelsButton)

        levelSelectButton.on('pointerdown', () => {
            this.onLevelSelect()
        })

        communityLevelsButton.on('pointerdown', () => {
            this.onCommunityLevels()
        })

        levelEditorButton.on('pointerdown', () => {
            this.onLevelEditor()
        })

        this.loginButton.on('pointerdown', () => {
            this.onLogin()
        })

        myLevelsButton.on('pointerdown', () => {
            this.onMyLevels()
        })

        this.form = this.add.dom(centreX, quarterY).createFromCache('form')
        this.form.setVisible(false)
        this.form.addListener('click')
        this.form.on('click', async (event: any) => {
            const inputUsername = <HTMLInputElement>this.form.getChildByName('username')
            const inputPassword = <HTMLInputElement>this.form.getChildByName('password')

            if (event.target.name === 'loginButton') {
                //  Have they entered anything?
                if (inputUsername.value !== '' && inputPassword.value !== '') {
                    const res = await client.login(inputUsername.value, inputPassword.value)
                    this.onAuthenticated()
                    //  Turn off the click events
                    // this.form.removeListener('click')

                    //  Populate the text with whatever they typed in as the username!
                    this.loginButton.setText('Logout')
                    this.username.setText(inputUsername.value)
                    this.form.setVisible(false)
                    this.scene.resume()
                }
            }
        })

        this.input.keyboard.on('keydown', (event: KeyboardEvent) => {
            if (event.key === 'g' || event.key === 'ArrowLeft') {
                this.onLevelSelect()
            } else if (event.key === 's' || event.key === 'ArrowUp') {
                this.onSettings()
            } else if (event.key === 'ArrowRight') {
                this.onLevelEditor()
            }
        })

        if (client.isAuthenticated()) {
            this.onAuthenticated()
        }
    }

    async onLevelSelect() {
        const folders = await client.getAdminLevels()
        this.scene.start('FolderSelectScene', folders)
    }

    onSettings() {
        console.log('unimplemented')
    }

    onLevelEditor() {
        this.scene.start('LevelEditorScene')
    }

    onLogin() {
        if (!client.isAuthenticated()) {
            this.form.setVisible(true)
            this.tweens.add({
                targets: this.form,
                y: 300,
                duration: 3000,
                ease: 'Power3'
            })
            this.scene.pause()
        } else {
            client.logout()
            this.loginButton.setText('Login')
            this.username.setText('Not logged in')
        }
    }

    onAuthenticated() {
        const username = client.getAuthenticatedUsername()
        this.loginButton.setText('Logout')
        this.username.setText(username)
    }

    async onMyLevels() {
        if (client.isAuthenticated()) {
            const folders = await client.getMyLevels()
            this.scene.start('FolderSelectScene', folders)
        }
    }

    async onCommunityLevels() {
        const folders = await client.getFeaturedLevels()
        this.scene.start('FolderSelectScene', folders)
    }
}
