type Callback = (user: User) => Promise<void>

export default class LoginForm extends Phaser.GameObjects.DOMElement {
    title: string | undefined
    callback!: Callback
    vh: {
        form: Element
        title: Element
        username: HTMLInputElement
        password: HTMLInputElement
        errorText: Element
        submit: HTMLInputElement
        exit: Element
    }

    constructor(scene: Phaser.Scene) {
        super(scene, scene.cameras.main.width / 2, scene.cameras.main.height / 2)

        this.createFromCache('form')

        this.vh = {
            form: <Element>document.querySelector('.login'),
            title: <Element>document.querySelector('.title'),
            username: <HTMLInputElement>document.querySelector('.username'),
            password: <HTMLInputElement>document.querySelector('.password'),
            errorText: <Element>document.querySelector('.error'),
            submit: <HTMLInputElement>document.querySelector('.submit'),
            exit: <Element>document.querySelector('.exit')
        }
    }

    async onClick(event: any) {
        if (event.target.name === 'submit') {
            if (this.vh.username.value !== '' && this.vh.password.value !== '') {
                try {
                    await this.callback({
                        username: this.vh.username.value,
                        password: this.vh.password.value
                    })
                    this.setVisible(false)
                    this.vh.errorText.textContent = ''
                } catch (err: any) {
                    console.log(window.location.hash, err)
                    this.vh.errorText.textContent = err.response.data.message
                }
            }
        } else if (event.target === this.vh.exit) {
            this.setVisible(false)
            this.scene.scene.resume()
        }
    }

    setTitle(title: string) {
        this.title = title
        this.vh.title.textContent = this.title
        this.vh.submit.value = this.title
    }

    popup(title: string, callback: Callback) {
        this.setTitle(title)
        this.callback = callback
        this.setVisible(true)
        this.vh.username.value = ''
        this.vh.password.value = ''
    }
}
