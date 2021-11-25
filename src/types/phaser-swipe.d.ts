declare module 'phaser3-swipe-plugin' {
    interface PluginInterface {
        UP: string
        RIGHT: string
        DOWN: string
        LEFT: string
    }
    interface ConfigInterface {
        offset: number
    }
    export default class SwipePlugin extends Phaser.Plugins.BasePlugin implements PluginInterface {
        UP: string
        RIGHT: string
        DOWN: string
        LEFT: string
        config: ConfigInterface
        private xDown?
        private yDown?
        constructor(pluginManager: any)
        init(data: any): void
        private onTouchstart
        private onTouchend
        private getTouch
        private configure
        private sendEvent
    }
    export {}
}
