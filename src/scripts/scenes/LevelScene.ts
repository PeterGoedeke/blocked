import Block from '../objects/Block'
import BlockFactory from '../objects/BlockFactory'
import { cellSize } from '../objects/GridManager'
import Player from '../objects/Player'

export default class LevelScene extends Phaser.Scene {
    player!: Player
    blocks!: Phaser.Physics.Arcade.StaticGroup
    pickups!: Phaser.Physics.Arcade.Group
    entities!: Phaser.Physics.Arcade.Group

    constructor() {
        super({ key: 'LevelScene' })
    }

    create() {
        const factory = BlockFactory.getInstance()

        this.blocks = this.physics.add.staticGroup()
        this.pickups = this.physics.add.group()
        this.entities = this.physics.add.group({
            collideWorldBounds: true
        })

        const a = factory.createBlockFromCode('b', this, cellSize * 1, cellSize * 1)
        const b = factory.createBlockFromCode('b', this, cellSize * 8, cellSize * 8)

        const c = factory.createBlockFromCode('i', this, cellSize * 10, cellSize * 8)
        const d = factory.createBlockFromCode('h', this, cellSize * 3, cellSize * 5)

        this.blocks.addMultiple([
            factory.createBlockFromCode('e', this, 0, cellSize * 4),
            factory.createBlockFromCode('a', this, cellSize * 1, cellSize * 5),
            factory.createBlockFromCode('e', this, cellSize * 1, cellSize * 2),
            factory.createBlockFromCode('e', this, cellSize * 5, cellSize * 3),
            factory.createBlockFromCode('a', this, cellSize * 2, cellSize * 5),
            factory.createBlockFromCode('a', this, cellSize * 2, cellSize * 4),
            // factory.createBlockFromCode('g', this, cellSize * 3, cellSize * 5),
            factory.createBlockFromCode('d', this, cellSize * 7, cellSize * 4),
            factory.createBlockFromCode('a', this, cellSize * 4, cellSize * 5),
            factory.createBlockFromCode('a', this, cellSize * 5, cellSize * 5),
            factory.createBlockFromCode('a', this, cellSize * 6, cellSize * 1),
            factory.createBlockFromCode('a', this, cellSize * 4, cellSize * 1),
            factory.createBlockFromCode('a', this, cellSize * 0, cellSize * 0),
            factory.createBlockFromCode('a', this, cellSize * 11, cellSize * 8),
            a,
            b,
            d
        ])
        this.pickups.add(c)

        a.strategy.link(b.strategy)
        b.strategy.link(a.strategy)

        c.strategy.link(d.strategy)

        this.player = new Player(this, 3 * cellSize, 1 * cellSize)
        this.entities.add(this.player)

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
    }

    update() {
        // test
    }
}
