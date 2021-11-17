type Callback = (level: Omit<LevelInDTO, 'gameLevel'>) => Promise<boolean>

export default class LevelForm extends Phaser.GameObjects.DOMElement {
    title: string | undefined
    callback!: Callback
    vh: {
        form: Element
        title: Element
        name: HTMLInputElement
        folderName: HTMLInputElement
        isPublic: HTMLInputElement
        index: HTMLInputElement
        submit: Element
        exit: Element
    }

    constructor(scene: Phaser.Scene) {
        super(scene, scene.cameras.main.width / 2, scene.cameras.main.height / 3)

        this.createFromCache('levelform')

        this.vh = {
            form: <Element>document.querySelector('.form'),
            title: <Element>document.querySelector('.title'),
            name: <HTMLInputElement>document.querySelector('.name'),
            folderName: <HTMLInputElement>document.querySelector('.folderName'),
            isPublic: <HTMLInputElement>document.querySelector('.isPublic'),
            index: <HTMLInputElement>document.querySelector('.index'),
            submit: <Element>document.querySelector('.submit'),
            exit: <Element>document.querySelector('.exit')
        }
    }

    async onClick(event: any) {
        if (event.target.name === 'submit') {
            if (this.vh.name.value !== '' && this.vh.folderName.value !== '') {
                const result = await this.callback({
                    folderName: this.vh.folderName.value,
                    index: Number(this.vh.index.value),
                    isPublic: this.vh.isPublic.checked,
                    name: this.vh.name.value
                })
                if (result) {
                    this.setVisible(false)
                } else {
                    console.log('Failed')
                }
            }
        } else if (event.target === this.vh.exit) {
            this.setVisible(false)
        }
    }

    setTitle(title: string) {
        this.title = title
        this.vh.title.textContent = this.title
    }

    popup(title: string, callback: Callback, level?: Level) {
        this.setTitle(title)
        this.callback = callback
        this.setVisible(true)
        if (level) {
            this.vh.name.value = level.name
            this.vh.folderName.value = level.folderName
            this.vh.isPublic.checked = level.isPublic
            this.vh.index.value = level.index.toString()
        }
    }
}
