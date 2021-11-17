import LevelScene from '../scenes/LevelScene'
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
import WinStrategy from './strategies/WinStrategy'

interface BlockSet {
    [key: string]: (scene: LevelScene, x: number, y: number) => Block
}

function createBlock(
    scene: LevelScene,
    x: number,
    y: number,
    tint: number,
    strategyClass: new (block: Block, texture?: string) => BlockStrategy,
    texture = 'block'
) {
    const block = new Block(scene, x, y, tint)
    const strategy = new strategyClass(block, texture)
    block.setStrategy(strategy)
    return block
}

interface BlockData {
    [key: string]: {
        tint: number
        strategy: new (block: Block, texture?: string) => BlockStrategy
        texture?: string
    }
}

const blockData: BlockData = {
    a: {
        tint: 0x808080,
        strategy: NullStrategy
    },
    b: {
        tint: 0x52d4ff,
        strategy: TeleporterStrategy
    },
    c: {
        tint: 0x0028c9,
        strategy: SwapperStrategy
    },
    d: {
        tint: 0xffbb1c,
        strategy: FourSwapperStrategy
    },
    e: {
        tint: 0xfdff6b,
        strategy: BouncerStrategy
    },
    f: {
        tint: 0xff82fd,
        strategy: PlatformStrategy
    },
    g: {
        tint: 0x821800,
        strategy: KillStrategy
    },
    h: {
        tint: 0xffffff,
        strategy: DoorStrategy,
        texture: 'lock'
    },
    i: {
        tint: 0xffffff,
        strategy: KeyStrategy,
        texture: 'key'
    },
    j: {
        tint: 0x37fa6b,
        strategy: WinStrategy
    }
}

export const getBlockList = () => {
    const keys = Object.keys(blockData)
    return keys.map(key => ({ code: key, ...blockData[key] }))
}

export const getBlockData = (code: string) => {
    return blockData[code]
}

export default class BlockFactory {
    private static instance: BlockFactory

    public static getInstance() {
        if (!this.instance) {
            this.instance = new BlockFactory()
        }
        return this.instance
    }

    public createBlockFromCode(blockCode: string, scene: LevelScene, x: number, y: number): Block {
        const data = blockData[blockCode]
        return createBlock(scene, x, y, data.tint, data.strategy, data.texture)
    }
}

export const isPickup = (code: string) => {
    return code === 'i'
}
