import Block from '../Block'
import Player from '../Player'

export default abstract class BlockStrategy {
    protected block: Block
    texture: string

    constructor(block: Block, texture = 'block') {
        this.block = block
        this.texture = texture
    }

    abstract handle(player: Player): void

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    link(strategy: BlockStrategy) {}

    blockGridCoordinates() {
        return this.block.gridCoordinates
    }
}
