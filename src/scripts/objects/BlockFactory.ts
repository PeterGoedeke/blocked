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
                return createBlock(scene, x, y, 0x52d4ff, TeleporterStrategy)
            },
            c: (scene, x, y) => {
                return createBlock(scene, x, y, 0x0028c9, SwapperStrategy)
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
                return createBlock(scene, x, y, 0x821800, KillStrategy)
            },
            h: (scene, x, y) => {
                return createBlock(scene, x, y, 0x734172, DoorStrategy)
            },
            i: (scene, x, y) => {
                return createBlock(scene, x, y, 0xc5eb94, KeyStrategy)
            },
            j: (scene, x, y) => {
                return createBlock(scene, x, y, 0x37fa6b, WinStrategy)
            }
        }
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new BlockFactory()
        }
        return this.instance
    }

    public createBlockFromCode(blockCode: string, scene: LevelScene, x: number, y: number): Block {
        return this.blockSet[blockCode](scene, x, y)
    }
}

export const isPickup = (code: string) => {
    return code === 'i'
}

export enum BlockCodes {
    STONE = 'a',
    TELEPORTER = 'b',
    SWAPPER = 'c',
    FOUR_SWAPPER = 'd',
    BOUNCER = 'e',
    PLATFORM = 'f',
    KILL = 'g',
    DOOR = 'h',
    KEY = 'i'
}

interface Dict {
    [key: string]: number
}

const blockTints: Dict = {
    a: 0x808080,
    b: 0x52d4ff,
    c: 0x0028c9,
    d: 0xffbb1c,
    e: 0xfdff6b,
    f: 0xff82fd,
    g: 0x821800,
    h: 0x734172,
    i: 0xc5eb94,
    j: 0x37fa6b
}

export const getBlockTintFromCode = (code: string) => {
    return blockTints[code]
}
