import Block from './Block'
import BlockStrategy from './strategies/BlockStrategy'
import BouncerStrategy from './strategies/BouncerStrategy'
import DoorStrategy from './strategies/DoorStrategy'
import FourSwapperStrategy from './strategies/FourSwapperStrategy'
import KeyStrategy from './strategies/KeyStrategy'
import KillStrategy from './strategies/KillStrategy'
import NullStrategy from './strategies/NullStrategy'
import PlatformStrategy from './strategies/PlatformStrategy'
import SwapperStrategy from './strategies/SwapperStrategy'
import TeleporterStrategy from './strategies/TeleporterStrategy'

interface BlockSet {
    [key: string]: (scene: Phaser.Scene, x: number, y: number) => Block
}

function createBlock(
    scene: Phaser.Scene,
    x: number,
    y: number,
    tint: number,
    strategyClass: new (block: Block) => BlockStrategy
) {
    const block = new Block(scene, x, y, tint)
    const strategy = new strategyClass(block)
    block.setStrategy(strategy)
    return block
}

export default class BlockFactory {
    private static instance: BlockFactory
    private blockSet: BlockSet

    private constructor() {
        this.blockSet = {
            a: (scene, x, y) => {
                return createBlock(scene, x, y, 0x808080, NullStrategy)
            },
            b: (scene, x, y) => {
                return createBlock(scene, x, y, 0x37fa6b, TeleporterStrategy)
            },
            c: (scene, x, y) => {
                return createBlock(scene, x, y, 0x004d46, SwapperStrategy)
            },
            d: (scene, x, y) => {
                return createBlock(scene, x, y, 0xffbb1c, FourSwapperStrategy)
            },
            e: (scene, x, y) => {
                return createBlock(scene, x, y, 0xfdff6b, BouncerStrategy)
            },
            f: (scene, x, y) => {
                return createBlock(scene, x, y, 0xff82fd, PlatformStrategy)
            },
            g: (scene, x, y) => {
                return createBlock(scene, x, y, 0x91008f, KillStrategy)
            },
            h: (scene, x, y) => {
                return createBlock(scene, x, y, 0x734172, DoorStrategy)
            },
            i: (scene, x, y) => {
                return createBlock(scene, x, y, 0xc5eb94, KeyStrategy)
            }
        }
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new BlockFactory()
        }
        return this.instance
    }

    public createBlockFromCode(
        blockCode: string,
        scene: Phaser.Scene,
        x: number,
        y: number
    ): Block {
        return this.blockSet[blockCode](scene, x, y)
    }
}
