import Block from '../objects/Block'
import BlockFactory, { isPickup } from '../objects/BlockFactory'
import { cellSize } from '../objects/GridManager'
import Player from '../objects/Player'
import '../objects/LevelManager'
import BlockStrategy from '../objects/strategies/BlockStrategy'

interface Level {
    width: number
    height: number
    playerStart: {
        x: number
        y: number
    }
    blocks: {
        x: number
        y: number
        type: string
        linkCode: string
    }[]
}

interface Links {
    [key: string]: BlockStrategy[]
}

export default class LevelScene extends Phaser.Scene {
    player!: Player
    blocks!: Phaser.Physics.Arcade.StaticGroup
    pickups!: Phaser.Physics.Arcade.Group
    entities!: Phaser.Physics.Arcade.Group
    level!: Level
    blockFactory: BlockFactory
    links: Links

    constructor() {
        super({ key: 'LevelScene' })

        this.blockFactory = BlockFactory.getInstance()
        this.links = {}
    }

    init(level: Level) {
        this.level = level
    }

    addBlock(type: string, gridX: number, gridY: number) {
        const block = this.blockFactory.createBlockFromCode(
            type,
            this,
            cellSize * gridX,
            cellSize * gridY
        )

        if (isPickup(type)) {
            this.pickups.add(block)
        } else {
            this.blocks.add(block)
        }

        return block
    }

    setPlayer(gridX: number, gridY: number) {
        this.player = new Player(this, gridX * cellSize, gridY * cellSize)
        this.entities.add(this.player)
    }

    create() {
        this.blocks = this.physics.add.staticGroup()
        this.pickups = this.physics.add.group()
        this.entities = this.physics.add.group({
            collideWorldBounds: false
        })

        this.level.blocks.forEach(blockRaw => {
            const block = this.addBlock(blockRaw.type, blockRaw.x, blockRaw.y)
            if (!this.links[blockRaw.linkCode]) {
                this.links[blockRaw.linkCode] = []
            }

            this.links[blockRaw.linkCode].forEach(strategy => {
                strategy.link(block.strategy)
                block.strategy.link(strategy)
            })

            this.links[blockRaw.linkCode].push(block.strategy)
        })

        this.setPlayer(this.level.playerStart.x, this.level.playerStart.y)

        // const a = factory.createBlockFromCode('b', this, cellSize * 1, cellSize * 1)
        // const b = factory.createBlockFromCode('b', this, cellSize * 8, cellSize * 8)

        // const c = factory.createBlockFromCode('i', this, cellSize * 10, cellSize * 8)
        // const d = factory.createBlockFromCode('h', this, cellSize * 3, cellSize * 5)

        // this.blocks.addMultiple([
        //     factory.createBlockFromCode('e', this, 0, cellSize * 4),
        //     factory.createBlockFromCode('a', this, cellSize * 1, cellSize * 5),
        //     factory.createBlockFromCode('e', this, cellSize * 1, cellSize * 2),
        //     factory.createBlockFromCode('e', this, cellSize * 5, cellSize * 3),
        //     factory.createBlockFromCode('a', this, cellSize * 2, cellSize * 5),
        //     factory.createBlockFromCode('a', this, cellSize * 2, cellSize * 4),
        //     // factory.createBlockFromCode('g', this, cellSize * 3, cellSize * 5),
        //     factory.createBlockFromCode('d', this, cellSize * 7, cellSize * 4),
        //     factory.createBlockFromCode('a', this, cellSize * 4, cellSize * 5),
        //     factory.createBlockFromCode('a', this, cellSize * 5, cellSize * 5),
        //     factory.createBlockFromCode('a', this, cellSize * 6, cellSize * 1),
        //     factory.createBlockFromCode('a', this, cellSize * 4, cellSize * 1),
        //     factory.createBlockFromCode('a', this, cellSize * 0, cellSize * 0),
        //     factory.createBlockFromCode('a', this, cellSize * 11, cellSize * 8),
        //     a,
        //     b,
        //     d
        // ])
        // this.pickups.add(c)

        // a.strategy.link(b.strategy)
        // b.strategy.link(a.strategy)

        // c.strategy.link(d.strategy)

        this.physics.add.collider(this.player, this.blocks, (p, b) => {
            const block = b as Block
            const player = p as Player

            block.collide(player)
        })

        this.physics.add.overlap(this.player, this.pickups, (p, b) => {
            const key = b as Block
            const player = p as Player

            key.collide(player)
        })

        const cursors = this.input.keyboard.createCursorKeys()

        cursors.left.addListener('down', () => {
            if (this.player.resting) {
                this.player.setGridDirection(new Phaser.Math.Vector2(-1, 0))
            }
        })
        cursors.right.addListener('down', () => {
            if (this.player.resting) {
                this.player.setGridDirection(new Phaser.Math.Vector2(1, 0))
            }
        })
        cursors.up.addListener('down', () => {
            if (this.player.resting) {
                this.player.setGridDirection(new Phaser.Math.Vector2(0, -1))
            }
        })
        cursors.down.addListener('down', () => {
            if (this.player.resting) {
                this.player.setGridDirection(new Phaser.Math.Vector2(0, 1))
            }
        })

        this.input.keyboard.on('keydown', (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                this.scene.launch('MenuOverlayScene', this.scene)
                this.scene.pause()
            }
        })
    }

    update() {
        if (
            !this.physics.world.bounds.contains(this.player.x, this.player.y) ||
            !this.physics.world.bounds.contains(
                this.player.x + this.player.displayWidth,
                this.player.y + this.player.displayHeight
            )
        ) {
            this.scene.restart()
        }
    }
}
