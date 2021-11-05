import Block from '../Block'
import Player from '../Player'

export default abstract class BlockStrategy {
    protected block: Block

    constructor(block: Block) {
        this.block = block
    }

    abstract handle(player: Player): void

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    link(strategy: BlockStrategy) {}

    blockGridCoordinates() {
        return this.block.gridCoordinates
    }
}
